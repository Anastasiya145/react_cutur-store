import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { createOrder } from "../../api/ordersApi";
import { useAppContext } from "../../context/AppContextProvider";
import { useAuth } from "../../context/AuthContext";
import { CreateOrderRequest } from "../../types/Order";
import { Address } from "../../types/User";
import { useNotification } from "../../context/NotificationContext";
import { updateUserAddress } from "../../api/userApi";
import "./checkoutPage.scss";
import "./components/OrderItem.scss";
import { useNavigate } from "react-router-dom";
import { PathnamesForUserMenu } from "../../types/Pathnames";
import { useAuthCheck } from "../../helpers/hooks/useAuthCheck";
import { EmptyCart } from "./components/EmptyCart";
import { OrderSummary } from "./components/OrderSummary";
import { CheckoutHeader } from "./components/CheckoutHeader";
import { ShippingForm } from "./components/ShippingForm";
import { ConfirmationStep } from "./components/ConfirmationStep";

type CheckoutFormData = {
  shippingAddress: Address;
  billingAddress: Address;
  sameAsShipping: boolean;
  saveAddress?: boolean;
  notes?: string;
};

const CheckoutPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { cart, clearCart } = useAppContext();
  const { user } = useAuth();
  useAuthCheck();
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    mode: "onChange",
    defaultValues: {
      sameAsShipping: true,
      saveAddress: false,
      shippingAddress: {
        country: "France",
        city: "",
        street: "",
        postalCode: "",
        apartment: "",
      },
      billingAddress: {
        country: "France",
        city: "",
        street: "",
        postalCode: "",
        apartment: "",
      },
    },
    reValidateMode: "onChange",
    // criteriaMode: "all",
  });

  const sameAsShipping = watch("sameAsShipping");
  const shippingAddress = watch("shippingAddress");
  const billingAddress = watch("billingAddress");

  // Auto-fill billing address when same as shipping is checked
  useEffect(() => {
    if (sameAsShipping) {
      setValue("billingAddress", shippingAddress);
    }
  }, [sameAsShipping, shippingAddress, setValue]);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.count,
    0
  );
  const shippingCost = total >= 50 ? 0 : 5.99;
  const finalTotal = total + shippingCost;

  const onSubmit = async () => {
    if (currentStep === 1) {
      // If user chose to save address, persist it to their profile
      try {
        const saveAddress = watch("saveAddress") as unknown as boolean;
        if (user && saveAddress) {
          // shippingAddress is already read from watch above
          await updateUserAddress(user, shippingAddress);
          showSuccess("Adresse sauvegardée dans le profil");
        }
      } catch (err: any) {
        showError(err.message);
      }

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

  console.log("Form errors:", errors, isValid);

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
                  shippingCost={shippingCost}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                />
              )}

              {currentStep === 2 && (
                <ConfirmationStep
                  shippingAddress={shippingAddress}
                  billingAddress={billingAddress}
                  sameAsShipping={sameAsShipping}
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
                isValid={isValid}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
