import { useEffect } from "react";
import { getData } from "../@/services/httphandler";

const PayCashfree = () => {
  useEffect(() => {
    const config = {};
    config.layout = {};

    config.checkout = "transparent";
    config.mode = "TEST";
    let response = window.CashFree.init(config);
    if (response.status !== "OK") {
    }
  }, []);
  const Pay = () => {
    window.CashFree.makePayment();

    var pc = (data) => {
      data.paymentOption = "card";
      data.card = {};
      data.card.number = "4444333322221111";
      data.card.expiryMonth = "07";
      data.card.expiryYear = "23";
      data.card.cvv = "123";
      window.CashFree.paySeamless(data, postPaymentCallback());
      return false;
    };
    const postPaymentCallback = (event) => {
      if (event.name == "PAYMENT_RESPONSE" && event.status == "SUCCESS") {
      } else if (
        event.name == "PAYMENT_RESPONSE" &&
        event.status == "CANCELLED"
      ) {
      } else if (event.name == "PAYMENT_RESPONSE" && event.status == "FAILED") {
      } else if (event.name == "VALIDATION_ERROR") {
      }
    };

    const payCard = () => {
      window.CashFree.initPopup(); // This is required for the popup to work even in case of callback.
      getData("https://reqres.in/api/users?page=2") // This is an open endpoint.
        .then((response) => {
          pc();
        });
    };
    const payBank = (data) => {
      window.CashFree.initPopup();
      data.paymentOption = "nb";
      data.nb = {};
      data.nb.code = "3002";

      window.CashFree.paySeamless(data, postPaymentCallback);
      return false;
    };
    const payWallet = (data) => {
      data.paymentOption = "wallet";
      data.wallet = {};
      data.wallet.code = 4001;

      window.CashFree.paySeamless(data, postPaymentCallback);
      return false;
    };
    const payUpi = (data) => {
      data.paymentOption = "upi";
      data.upi = {};
      data.upi.vpa = 3244;
      window.CashFree.paySeamless(data, postPaymentCallback);
      return false;
    };
  };

  return <button onClick={Pay()}>PAY Now</button>;
};

export default PayCashfree;
