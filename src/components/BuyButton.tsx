import React from "react";
import { Button } from "@mui/material";

interface BuyButtonProps {
  productName: string;
  price: number;
  disabled?: boolean;
}

const BuyButton: React.FC<BuyButtonProps> = ({
  productName,
  price,
  disabled = false,
}) => {
  const handleClick = () => {
  const phoneNumber = "593999727075";
  const message = `Hola! Estoy interesado en comprar *${productName}* por $${price}.`;
  const encodedMessage = encodeURIComponent(message);
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

  window.open(url, "_blank");
};


  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      disabled={disabled}
      sx={{
        borderRadius: 5,
        fontWeight: "bold",
        py: 1.5,
        px: 4,
        fontSize: "1.1rem",
        textTransform: "uppercase",
        letterSpacing: 1,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
        },
        transition: "all 0.3s ease",
      }}
      onClick={handleClick}
    >
      Comprar por ${price}
    </Button>
  );
};

export default BuyButton;
