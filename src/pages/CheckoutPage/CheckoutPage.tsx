import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createOrder } from "../../api/ordersApi";
import { useAppContext } from "../../context/AppContextProvider";
import { useAuth } from "../../context/AuthContext";
import { CreateOrderRequest } from "../../types/Order";
import { Address } from "../../types/User";
import { useNotification } from "../../context/NotificationContext";
import "./checkoutPage.scss";
import "./components/OrderItem.scss";
import { useNavigate } from "react-router-dom";
import { PathnamesForUserMenu } from "../../types/Pathnames";
import {
  CheckoutHeader,
  ShippingForm,
  ConfirmationStep,
  OrderSummary,
  EmptyCart,
} from "./components";

type CheckoutFormData = {
  shippingAddress: Address;
  billingAddress: Address;
  sameAsShipping: boolean;
  notes?: string;
};

const CheckoutPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { cart, clearCart } = useAppContext();
  const { user } = useAuth();
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    defaultValues: {
      sameAsShipping: true,
      shippingAddress: {
        country: "France",
        city: "",
        street: "",
        postalCode: "",
        apartment: "",
      },
    },
  });

  const sameAsShipping = watch("sameAsShipping");
  const shippingAddress = watch("shippingAddress");

  // Pre-fill address could be added later when user profile is available

  // Auto-fill billing address when same as shipping is checked
  useEffect(() => {
    if (sameAsShipping) {
      setValue("billingAddress", shippingAddress);
    }
  }, [sameAsShipping, shippingAddress, setValue]);

  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);
  const shippingCost = total >= 50 ? 0 : 5.99;
  const finalTotal = total + shippingCost;

  const onSubmit = async () => {
    if (currentStep === 1) {
      setCurrentStep(2);
      return;
    }

    setLoading(true);
    try {
      const orderData: CreateOrderRequest = {
        user_email: user || "",
        items: cart.map((item) => ({
          id: item.id,
          quantity: item.count,
        })),
      };

      await createOrder(orderData);
      showSuccess("Commande passée avec succès!");
      clearCart();
      navigate(PathnamesForUserMenu.Commandes);
    } catch (err: any) {
      showError(err.message || "Erreur lors de la commande.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-page__container">
        <CheckoutHeader currentStep={currentStep} />

        <form onSubmit={handleSubmit(onSubmit)} className="checkout-page__form">
          <div className="checkout-page__content">
            <div className="checkout-page__main">
              {currentStep === 1 && (
                <ShippingForm
                  register={register}
                  errors={errors}
                  shippingCost={shippingCost}
                />
              )}

              {currentStep === 2 && (
                <ConfirmationStep
                  shippingAddress={shippingAddress}
                  cart={cart}
                  onEditAddress={() => setCurrentStep(1)}
                />
              )}
            </div>

            <div className="checkout-page__sidebar">
              <OrderSummary
                cart={cart}
                total={total}
                shippingCost={shippingCost}
                finalTotal={finalTotal}
                currentStep={currentStep}
                loading={loading}
                onBack={() => setCurrentStep(1)}
                onContinue={handleSubmit(onSubmit)}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
