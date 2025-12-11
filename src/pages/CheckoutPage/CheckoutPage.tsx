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
import { PathnamesApp, PathnamesForUserMenu } from "../../types/Pathnames";
import { useAuthCheck } from "../../helpers/hooks/useAuthCheck";
import { EmptyCart } from "./components/EmptyCart";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import { CheckoutHeader } from "./components/CheckoutHeader";
import { ShippingForm } from "./components/ShippingForm";
import { ConfirmationStep } from "./components/ConfirmationStep";
import PaymentStep from "./components/PaymentStep";

type CheckoutFormData = {
  shippingAddress: Address;
  billingAddress: Address;
  sameAsShipping: boolean;
  saveAddress?: boolean;
  notes?: string;
  payment?: {
    method?: string;
    cardName?: string;
    cardNumber?: string;
    expiry?: string;
    cvc?: string;
    cardType?: string;
  };
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
      payment: {
        method: "card",
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvc: "",
        cardType: "",
      },
    },
  });

  const sameAsShipping = watch("sameAsShipping");
  const shippingAddress = watch("shippingAddress");
  const billingAddress = watch("billingAddress");

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

  const onSubmit = async () => {
    console.log("CheckoutPage onSubmit called, currentStep:", currentStep);
    console.log("Form errors:", errors);
    console.log("Form isValid:", isValid);

    if (currentStep === 1) {
      // If user chose to save address, persist it to their profile
      try {
        const saveAddress = watch("saveAddress") as unknown as boolean;
        if (user && saveAddress) {
          // shippingAddress is already read from watch above
          await updateUserAddress(user, shippingAddress);
          showSuccess("Adresse sauvegardée dans le profil");
        }
      } catch (err) {
        const error = err as Error;
        showError(error.message || "Erreur lors de la sauvegarde de l'adresse");
      }

      setCurrentStep(2);
      return;
    }
    if (currentStep === 2) {
      setCurrentStep(3);
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
    } catch (err) {
      const error = err as Error;
      showError(error.message || "Erreur lors de la commande.");
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
              {currentStep === 3 && (
                <PaymentStep
                  register={register}
                  watch={watch}
                  setValue={setValue}
                  errors={errors}
                />
              )}
            </div>

            <OrderSummary
              cart={cart}
              totalSum={total}
              onCheckout={onSubmit}
              onContinue={() =>
                currentStep > 1
                  ? setCurrentStep(currentStep - 1)
                  : navigate(PathnamesApp.Panier)
              }
              isDeliveryPriceShown={true}
              buttonContinueLoading={loading}
              isButtonContinueDisabled={!isValid}
              badgeType="paiement"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
