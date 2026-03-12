"use client";

import { useState, useTransition } from "react";
import {
  CreditCard,
  CheckCircle,
  ExternalLink,
  AlertCircle,
  Banknote,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHaptic } from "@/lib/hooks/use-haptics";
import { useToast } from "@/components/ui/toast";
import { createStripeConnectLink, getStripeConnectDashboardLink } from "@/lib/actions/clothes";

type Props = {
  stripeAccountId: string | null;
};

export function StripeConnectSetup({ stripeAccountId }: Props) {
  const haptics = useHaptic();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [localAccountId, setLocalAccountId] = useState(stripeAccountId);

  const isConnected = !!localAccountId;

  function handleSetup() {
    haptics.impact("medium");
    startTransition(async () => {
      const result = await createStripeConnectLink();
      if ("error" in result) {
        toast(result.error, "error");
        haptics.notify("error");
      } else {
        // Redirect to Stripe onboarding
        window.location.href = result.url;
      }
    });
  }

  function handleDashboard() {
    haptics.impact("light");
    startTransition(async () => {
      const result = await getStripeConnectDashboardLink();
      if ("error" in result) {
        toast(result.error, "error");
        haptics.notify("error");
      } else {
        window.open(result.url, "_blank");
      }
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card padding="md">
        <div>
          {/* Header */}
          <div>
            <div
             
              style={{
                background: isConnected ? "var(--ec-mint-100)" : "var(--surface-raised)",
              }}
            >
              {isConnected ? (
                <CheckCircle />
              ) : (
                <CreditCard />
              )}
            </div>
            <div>
              <p>Payout Setup</p>
              <p>
                {isConnected ? "Your payouts are connected via Stripe" : "Connect Stripe to receive payments"}
              </p>
            </div>
          </div>

          {/* Status / Info */}
          {isConnected ? (
            <div
             
             
            >
              <CheckCircle />
              <div>
                <p>Stripe account connected</p>
                <p>{localAccountId}</p>
              </div>
            </div>
          ) : (
            <div
             
             
            >
              <AlertCircle />
              <div>
                <p>Payouts not set up</p>
                <p>
                  You need to connect a Stripe account before buyers can pay for your items. Setup takes about 5 minutes.
                </p>
              </div>
            </div>
          )}

          {/* What you get */}
          {!isConnected && (
            <ul>
              {[
                "Receive direct bank transfers for each sale",
                "Automatic payouts on a weekly schedule",
                "Full sales history in Stripe dashboard",
                "Buyer payment protection via Stripe",
              ].map((item) => (
                <li key={item}>
                  <CheckCircle />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Action */}
          {isConnected ? (
            <div>
              <Button
                variant="secondary"
                icon={<Banknote />}
                onClick={handleDashboard}
                loading={isPending}
               
              >
                Stripe Dashboard
              </Button>
              <Button
                variant="tertiary"
                icon={<ExternalLink />}
                onClick={handleSetup}
                loading={isPending}
               
              >
                Update
              </Button>
            </div>
          ) : (
            <Button
              variant="primary"
              icon={<CreditCard />}
              onClick={handleSetup}
              loading={isPending}
              fullWidth
             
            >
              Connect Stripe Account
            </Button>
          )}

          <p>
            Powered by Stripe Connect · Your banking data is never stored on Ecodia servers
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
