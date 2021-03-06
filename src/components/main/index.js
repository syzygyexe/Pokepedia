import React from "react";
import { Background, Container, ButtonLink } from "./styles/main";

export default function Main({ bg = true, children, ...restProps }) {
  return bg ? <Background {...restProps}>{children}</Background> : children;
}

Main.Frame = function MainFrame({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Main.ButtonLink = function MainButtonLink({ to, children, ...restProps }) {
  return (
    <ButtonLink to={to} {...restProps}>
      {children}
    </ButtonLink>
  );
};
