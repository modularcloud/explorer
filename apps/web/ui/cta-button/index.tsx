"use client";

import { ButtonBody } from "./button-body";

type Props = {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export function CtaButton({ variant, children, onClick, className }: Props) {
  return (
    <ButtonBody className={className} onClick={onClick}>
      {children}
    </ButtonBody>
  );
}

export function FeedbackButton() {
  return (
    <CtaButton
      variant="secondary"
      className="cursor-pointer"
      onClick={() => (window as any).Usersnap?.logEvent("user_feedback")}
    >
      Feedback
    </CtaButton>
  );
}
