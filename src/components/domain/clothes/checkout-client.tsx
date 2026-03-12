"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, CreditCard, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShippingAddressForm } from "./shipping-address-form";
import { useHaptic } from "@/lib/hooks/use-haptics";
import { createCheckoutSession } from "@/lib/actions/clothes";
import { formatPrice } from "@/lib/constants/clothes";
import type { BagItemWithDetail } from "@/lib/actions/clothes";
import type { ShippingAddress } from "@/types/domain";

type Step = "review" | "shipping" | "payment";

type Props = {
  bagItems: BagItemWithDetail[];
  savedAddresses: ShippingAddress[];
};

export function CheckoutClient({ bagItems, savedAddresses: initialAddresses }: Props) {
  const router = useRouter();
  const haptics = useHaptic();
  const [step, setStep] = useState<Step>("review");
  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    initialAddresses.find((a) => a.is_default)?.id ?? initialAddresses[0]?.id ?? null
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(initialAddresses.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const bagItemIds = bagItems.map((b) => b.id);
  const total = bagItems.reduce((sum, b) => sum + (b.item?.price_cents ?? 0), 0);

  const steps: { key: Step; label: string; icon: React.ReactNode }[] = [
    { key: "review", label: "Review", icon: <Package /> },
    { key: "shipping", label: "Shipping", icon: <MapPin /> },
    { key: "payment", label: "Payment", icon: <CreditCard /> },
  ];

  const stepIndex = steps.findIndex((s) => s.key === step);

  function handlePay() {
    setError(null);
    haptics.impact("heavy");

    startTransition(async () => {
      const result = await createCheckoutSession({
        bagItemIds,
        shippingAddressId: selectedAddressId ?? undefined,
      });

      if ("error" in result) {
        setError(result.error);
        haptics.notify("error");
        return;
      }

      haptics.notify("success");
      window.location.href = result.url;
    });
  }

  return (
    <div>
      {/* Back */}
      <button
        onClick={() => {
          haptics.impact("light");
          if (step === "review") {
            router.push("/bag");
          } else if (step === "shipping") {
            setStep("review");
          } else {
            setStep("shipping");
          }
        }}
       
      >
        <ArrowLeft />
        {step === "review" ? "Back to Bag" : "Back"}
      </button>

      {/* Step indicator */}
      <div>
        {steps.map((s, i) => (
          <div key={s.key}>
            <div
             
             
            >
              <div
               
                style={{
                  background: i < stepIndex
                    ? "var(--ec-forest-600)"
                    : i === stepIndex
                      ? "var(--ec-mint-500)"
                      : "var(--surface-subtle)",
                  color: i <= stepIndex ? "#fff" : "var(--text-muted)",
                }}
              >
                {i < stepIndex ? <CheckCircle /> : s.icon}
              </div>
              <span>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div
               
               
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Review */}
      {step === "review" && (
        <div>
          <div
           
           
          >
            {bagItems.map((bagItem) => {
              const item = bagItem.item;
              if (!item) return null;
              const images = Array.isArray(item.images) ? (item.images as string[]) : [];
              const hero = images[0] ?? null;
              return (
                <div key={bagItem.id}>
                  {hero ? (
                    <img src={hero} alt={item.title} />
                  ) : (
                    <div />
                  )}
                  <div>
                    <p>{item.title}</p>
                    {item.store && (
                      <p>@{item.store.handle}</p>
                    )}
                  </div>
                  <p>
                    {formatPrice(item.price_cents ?? 0)}
                  </p>
                </div>
              );
            })}
          </div>

          <div>
            <span>Total</span>
            <span>
              {formatPrice(total)}
            </span>
          </div>

          <Button
            variant="primary"
            fullWidth
            icon={<MapPin />}
            onClick={() => {
              haptics.impact("medium");
              setStep("shipping");
            }}
          >
            Continue to Shipping
          </Button>
        </div>
      )}

      {/* Step 2: Shipping */}
      {step === "shipping" && (
        <div>
          {!showNewAddressForm && addresses.length > 0 && (
            <>
              <p>Saved addresses</p>
              <div>
                {addresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => {
                      haptics.impact("light");
                      setSelectedAddressId(addr.id);
                    }}
                   
                    style={{
                      borderColor: selectedAddressId === addr.id ? "var(--ec-forest-600)" : "var(--border)",
                      background: selectedAddressId === addr.id ? "var(--ec-forest-50)" : "var(--surface-elevated)",
                      boxShadow: selectedAddressId === addr.id ? "var(--neo-shadow-sm)" : "none",
                    }}
                  >
                    <div>
                      <div
                       
                        style={{
                          borderColor: selectedAddressId === addr.id ? "var(--ec-forest-600)" : "var(--border)",
                          background: selectedAddressId === addr.id ? "var(--ec-forest-600)" : "transparent",
                        }}
                      >
                        {selectedAddressId === addr.id && (
                          <div />
                        )}
                      </div>
                      <div>
                        {addr.label && (
                          <p>
                            {addr.label}
                          </p>
                        )}
                        <p>{addr.line1}</p>
                        {addr.line2 && <p>{addr.line2}</p>}
                        <p>
                          {addr.city} {addr.state} {addr.postcode}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  haptics.impact("light");
                  setShowNewAddressForm(true);
                }}
               
               
              >
                + Add new address
              </button>
            </>
          )}

          {showNewAddressForm && (
            <div
             
             
            >
              <p>New address</p>
              <ShippingAddressForm
                onSaved={(addr) => {
                  setAddresses((prev) => [addr, ...prev]);
                  setSelectedAddressId(addr.id);
                  setShowNewAddressForm(false);
                }}
                onCancel={addresses.length > 0 ? () => setShowNewAddressForm(false) : undefined}
              />
            </div>
          )}

          {!showNewAddressForm && (
            <Button
              variant="primary"
              fullWidth
              icon={<CreditCard />}
              onClick={() => {
                haptics.impact("medium");
                setStep("payment");
              }}
            >
              Continue to Payment
            </Button>
          )}
        </div>
      )}

      {/* Step 3: Payment */}
      {step === "payment" && (
        <div>
          <div
           
           
          >
            <p>Order summary</p>
            {bagItems.map((b) => b.item && (
              <div key={b.id}>
                <span>{b.item.title}</span>
                <span>
                  {formatPrice(b.item.price_cents ?? 0)}
                </span>
              </div>
            ))}
            <div>
              <span>Total</span>
              <span>
                {formatPrice(total)}
              </span>
            </div>
          </div>

          {selectedAddressId && (
            <div
             
             
            >
              <MapPin />
              <span>
                {(() => {
                  const addr = addresses.find((a) => a.id === selectedAddressId);
                  if (!addr) return "No address selected";
                  return [addr.line1, addr.city, addr.state, addr.postcode].filter(Boolean).join(", ");
                })()}
              </span>
            </div>
          )}

          {error && (
            <div
             
             
            >
              {error}
            </div>
          )}

          <p>
            You will be redirected to Stripe to complete your payment securely.
          </p>

          <Button
            variant="primary"
            fullWidth
            loading={isPending}
            icon={<CreditCard />}
            onClick={handlePay}
          >
            Pay {formatPrice(total)}
          </Button>
        </div>
      )}
    </div>
  );
}
