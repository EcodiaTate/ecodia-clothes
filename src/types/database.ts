// =============================================================================
// Supabase Database Types - generated from 00001_initial_schema.sql
// =============================================================================

export type Database = {
  public: {
    Tables: {
      // =====================================================================
      // 1. PROFILES (extends auth.users)
      // =====================================================================
      profiles: {
        Row: {
          id: string;
          display_name: string;
          role: Database["public"]["Enums"]["user_role"];
          avatar_url: string | null;
          bio: string | null;
          birth_year: number | null;
          over18_confirmed: boolean | null;
          tos_version: string | null;
          tos_accepted_at: string | null;
          privacy_accepted_at: string | null;
          legal_onboarding_complete: boolean | null;
          xp_total: number | null;
          eco_balance: number | null;
          level: number | null;
          streak_days: number | null;
          actions_total: number | null;
          is_admin: boolean | null;
          caps: Record<string, unknown> | null;
          selected_title_id: string | null;
          visible_badge_ids: string[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id: string;
          display_name?: string;
          role?: Database["public"]["Enums"]["user_role"];
          avatar_url?: string | null;
          bio?: string | null;
          birth_year?: number | null;
          over18_confirmed?: boolean | null;
          tos_version?: string | null;
          tos_accepted_at?: string | null;
          privacy_accepted_at?: string | null;
          legal_onboarding_complete?: boolean | null;
          xp_total?: number | null;
          eco_balance?: number | null;
          level?: number | null;
          streak_days?: number | null;
          actions_total?: number | null;
          is_admin?: boolean | null;
          caps?: Record<string, unknown> | null;
          selected_title_id?: string | null;
          visible_badge_ids?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          display_name?: string;
          role?: Database["public"]["Enums"]["user_role"];
          avatar_url?: string | null;
          bio?: string | null;
          birth_year?: number | null;
          over18_confirmed?: boolean | null;
          tos_version?: string | null;
          tos_accepted_at?: string | null;
          privacy_accepted_at?: string | null;
          legal_onboarding_complete?: boolean | null;
          xp_total?: number | null;
          eco_balance?: number | null;
          level?: number | null;
          streak_days?: number | null;
          actions_total?: number | null;
          is_admin?: boolean | null;
          caps?: Record<string, unknown> | null;
          selected_title_id?: string | null;
          visible_badge_ids?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 2. HOME LAYOUTS
      // =====================================================================
      home_layouts: {
        Row: {
          user_id: string;
          items: Record<string, unknown>;
          updated_at: string | null;
        };
        Insert: {
          user_id: string;
          items?: Record<string, unknown>;
          updated_at?: string | null;
        };
        Update: {
          user_id?: string;
          items?: Record<string, unknown>;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 3. BANS
      // =====================================================================
      bans: {
        Row: {
          email_norm: string;
          reason: string;
          created_by: string | null;
          created_at: string | null;
        };
        Insert: {
          email_norm: string;
          reason: string;
          created_by?: string | null;
          created_at?: string | null;
        };
        Update: {
          email_norm?: string;
          reason?: string;
          created_by?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 4. BUSINESSES
      // =====================================================================
      businesses: {
        Row: {
          id: string;
          owner_id: string;
          name: string;
          tagline: string | null;
          description: string | null;
          website: string | null;
          address: string | null;
          area: string | null;
          abn: string | null;
          lat: number | null;
          lng: number | null;
          industry_group: string | null;
          size: string | null;
          business_type: Database["public"]["Enums"]["business_type"] | null;
          pledge_tier: Database["public"]["Enums"]["pledge_tier"] | null;
          hero_url: string | null;
          avatar_url: string | null;
          logo_image_url: string | null;
          hours_map: Record<string, unknown> | null;
          rules_first_visit: number | null;
          rules_return_visit: number | null;
          rules_cooldown_hours: number | null;
          rules_daily_cap_per_user: number | null;
          rules_geofence_radius_m: number | null;
          standards_eco: Record<string, unknown> | null;
          standards_sustainability: Record<string, unknown> | null;
          standards_social: Record<string, unknown> | null;
          certifications: Record<string, unknown> | null;
          socials: Record<string, unknown> | null;
          links: Record<string, unknown> | null;
          tags: string[] | null;
          visible_on_map: boolean | null;
          qr_code: string | null;
          subscription_status: string | null;
          latest_unit_amount_aud: number | null;
          onboarding_completed: boolean | null;
          onboarding_completed_at: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          owner_id: string;
          name: string;
          tagline?: string | null;
          description?: string | null;
          website?: string | null;
          address?: string | null;
          area?: string | null;
          abn?: string | null;
          lat?: number | null;
          lng?: number | null;
          industry_group?: string | null;
          size?: string | null;
          business_type?: Database["public"]["Enums"]["business_type"] | null;
          pledge_tier?: Database["public"]["Enums"]["pledge_tier"] | null;
          hero_url?: string | null;
          avatar_url?: string | null;
          logo_image_url?: string | null;
          hours_map?: Record<string, unknown> | null;
          rules_first_visit?: number | null;
          rules_return_visit?: number | null;
          rules_cooldown_hours?: number | null;
          rules_daily_cap_per_user?: number | null;
          rules_geofence_radius_m?: number | null;
          standards_eco?: Record<string, unknown> | null;
          standards_sustainability?: Record<string, unknown> | null;
          standards_social?: Record<string, unknown> | null;
          certifications?: Record<string, unknown> | null;
          socials?: Record<string, unknown> | null;
          links?: Record<string, unknown> | null;
          tags?: string[] | null;
          visible_on_map?: boolean | null;
          qr_code?: string | null;
          subscription_status?: string | null;
          latest_unit_amount_aud?: number | null;
          onboarding_completed?: boolean | null;
          onboarding_completed_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          owner_id?: string;
          name?: string;
          tagline?: string | null;
          description?: string | null;
          website?: string | null;
          address?: string | null;
          area?: string | null;
          abn?: string | null;
          lat?: number | null;
          lng?: number | null;
          industry_group?: string | null;
          size?: string | null;
          business_type?: Database["public"]["Enums"]["business_type"] | null;
          pledge_tier?: Database["public"]["Enums"]["pledge_tier"] | null;
          hero_url?: string | null;
          avatar_url?: string | null;
          logo_image_url?: string | null;
          hours_map?: Record<string, unknown> | null;
          rules_first_visit?: number | null;
          rules_return_visit?: number | null;
          rules_cooldown_hours?: number | null;
          rules_daily_cap_per_user?: number | null;
          rules_geofence_radius_m?: number | null;
          standards_eco?: Record<string, unknown> | null;
          standards_sustainability?: Record<string, unknown> | null;
          standards_social?: Record<string, unknown> | null;
          certifications?: Record<string, unknown> | null;
          socials?: Record<string, unknown> | null;
          links?: Record<string, unknown> | null;
          tags?: string[] | null;
          visible_on_map?: boolean | null;
          qr_code?: string | null;
          subscription_status?: string | null;
          latest_unit_amount_aud?: number | null;
          onboarding_completed?: boolean | null;
          onboarding_completed_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 5. BUSINESS METRICS
      // =====================================================================
      business_metrics: {
        Row: {
          business_id: string;
          sponsor_balance_cents: number | null;
          eco_triggered_total: number | null;
          eco_triggered_30d: number | null;
          contributions_total: number | null;
          contributions_30d: number | null;
          eco_retired_total: number | null;
          eco_retired_30d: number | null;
          claims_30d: number | null;
          unique_claimants_30d: number | null;
          redemptions_30d: number | null;
          last_claim_at: string | null;
          eco_velocity_30d: number | null;
          minted_eco: number | null;
          eco_contributed_total: number | null;
          eco_given_total: number | null;
          updated_at: string | null;
        };
        Insert: {
          business_id: string;
          sponsor_balance_cents?: number | null;
          eco_triggered_total?: number | null;
          eco_triggered_30d?: number | null;
          contributions_total?: number | null;
          contributions_30d?: number | null;
          eco_retired_total?: number | null;
          eco_retired_30d?: number | null;
          claims_30d?: number | null;
          unique_claimants_30d?: number | null;
          redemptions_30d?: number | null;
          last_claim_at?: string | null;
          eco_velocity_30d?: number | null;
          minted_eco?: number | null;
          eco_contributed_total?: number | null;
          eco_given_total?: number | null;
          updated_at?: string | null;
        };
        Update: {
          business_id?: string;
          sponsor_balance_cents?: number | null;
          eco_triggered_total?: number | null;
          eco_triggered_30d?: number | null;
          contributions_total?: number | null;
          contributions_30d?: number | null;
          eco_retired_total?: number | null;
          eco_retired_30d?: number | null;
          claims_30d?: number | null;
          unique_claimants_30d?: number | null;
          redemptions_30d?: number | null;
          last_claim_at?: string | null;
          eco_velocity_30d?: number | null;
          minted_eco?: number | null;
          eco_contributed_total?: number | null;
          eco_given_total?: number | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 6. OFFERS
      // =====================================================================
      offers: {
        Row: {
          id: string;
          business_id: string;
          title: string;
          blurb: string | null;
          offer_type: Database["public"]["Enums"]["offer_type"];
          status: Database["public"]["Enums"]["offer_status"] | null;
          eco_price: number | null;
          fiat_cost_cents: number | null;
          stock: number | null;
          url: string | null;
          valid_until: string | null;
          redemption_mode: Database["public"]["Enums"]["redemption_mode"] | null;
          discount_code: string | null;
          template_id: string | null;
          criteria: Record<string, unknown> | null;
          tags: string[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          title: string;
          blurb?: string | null;
          offer_type?: Database["public"]["Enums"]["offer_type"];
          status?: Database["public"]["Enums"]["offer_status"] | null;
          eco_price?: number | null;
          fiat_cost_cents?: number | null;
          stock?: number | null;
          url?: string | null;
          valid_until?: string | null;
          redemption_mode?: Database["public"]["Enums"]["redemption_mode"] | null;
          discount_code?: string | null;
          template_id?: string | null;
          criteria?: Record<string, unknown> | null;
          tags?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          title?: string;
          blurb?: string | null;
          offer_type?: Database["public"]["Enums"]["offer_type"];
          status?: Database["public"]["Enums"]["offer_status"] | null;
          eco_price?: number | null;
          fiat_cost_cents?: number | null;
          stock?: number | null;
          url?: string | null;
          valid_until?: string | null;
          redemption_mode?: Database["public"]["Enums"]["redemption_mode"] | null;
          discount_code?: string | null;
          template_id?: string | null;
          criteria?: Record<string, unknown> | null;
          tags?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 7. VOUCHERS
      // =====================================================================
      vouchers: {
        Row: {
          id: string;
          offer_id: string;
          user_id: string;
          status: Database["public"]["Enums"]["voucher_status"] | null;
          code: string | null;
          created_at: string | null;
          verified_at: string | null;
          consumed_at: string | null;
          expires_at: string | null;
        };
        Insert: {
          id?: string;
          offer_id: string;
          user_id: string;
          status?: Database["public"]["Enums"]["voucher_status"] | null;
          code?: string | null;
          created_at?: string | null;
          verified_at?: string | null;
          consumed_at?: string | null;
          expires_at?: string | null;
        };
        Update: {
          id?: string;
          offer_id?: string;
          user_id?: string;
          status?: Database["public"]["Enums"]["voucher_status"] | null;
          code?: string | null;
          created_at?: string | null;
          verified_at?: string | null;
          consumed_at?: string | null;
          expires_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 8. ECO TRANSACTIONS
      // =====================================================================
      eco_transactions: {
        Row: {
          id: string;
          user_id: string;
          kind: Database["public"]["Enums"]["eco_tx_kind"];
          direction: Database["public"]["Enums"]["eco_tx_direction"];
          amount: number;
          xp: number | null;
          source: string | null;
          metadata: Record<string, unknown> | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          kind: Database["public"]["Enums"]["eco_tx_kind"];
          direction: Database["public"]["Enums"]["eco_tx_direction"];
          amount: number;
          xp?: number | null;
          source?: string | null;
          metadata?: Record<string, unknown> | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          kind?: Database["public"]["Enums"]["eco_tx_kind"];
          direction?: Database["public"]["Enums"]["eco_tx_direction"];
          amount?: number;
          xp?: number | null;
          source?: string | null;
          metadata?: Record<string, unknown> | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 9. BUSINESS ACTIVITY
      // =====================================================================
      business_activity: {
        Row: {
          id: string;
          business_id: string;
          user_id: string | null;
          kind: string;
          amount: number | null;
          offer_id: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          business_id: string;
          user_id?: string | null;
          kind: string;
          amount?: number | null;
          offer_id?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          business_id?: string;
          user_id?: string | null;
          kind?: string;
          amount?: number | null;
          offer_id?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 10. SIDEQUESTS
      // =====================================================================
      sidequests: {
        Row: {
          id: string;
          kind: Database["public"]["Enums"]["sidequest_kind"];
          status: Database["public"]["Enums"]["sidequest_status"];
          title: string;
          subtitle: string | null;
          description_md: string | null;
          semantic_profile: string | null;
          reward_eco: number | null;
          xp_reward: number | null;
          max_completions_per_user: number | null;
          cooldown_days: number | null;
          hero_image: string | null;
          card_accent: string | null;
          difficulty: string | null;
          impact: string | null;
          time_estimate_min: number | null;
          materials: string[] | null;
          facts: string[] | null;
          geo_lat: number | null;
          geo_lon: number | null;
          geo_radius_m: number | null;
          geo_locality: string | null;
          verification_methods: Database["public"]["Enums"]["verification_method"][] | null;
          tags: string[] | null;
          start_at: string | null;
          end_at: string | null;
          streak_name: string | null;
          streak_period: string | null;
          streak_bonus_eco: number | null;
          streak_max_steps: number | null;
          rotation_is_weekly: boolean | null;
          rotation_iso_year: number | null;
          rotation_iso_week: number | null;
          rotation_slot_index: number | null;
          rotation_starts_on: string | null;
          rotation_ends_on: string | null;
          chain_id: string | null;
          chain_order: number | null;
          chain_requires_prev: boolean | null;
          team_allowed: boolean | null;
          team_min_size: number | null;
          team_max_size: number | null;
          team_bonus_eco: number | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          kind?: Database["public"]["Enums"]["sidequest_kind"];
          status?: Database["public"]["Enums"]["sidequest_status"];
          title: string;
          subtitle?: string | null;
          description_md?: string | null;
          semantic_profile?: string | null;
          reward_eco?: number | null;
          xp_reward?: number | null;
          max_completions_per_user?: number | null;
          cooldown_days?: number | null;
          hero_image?: string | null;
          card_accent?: string | null;
          difficulty?: string | null;
          impact?: string | null;
          time_estimate_min?: number | null;
          materials?: string[] | null;
          facts?: string[] | null;
          geo_lat?: number | null;
          geo_lon?: number | null;
          geo_radius_m?: number | null;
          geo_locality?: string | null;
          verification_methods?: Database["public"]["Enums"]["verification_method"][] | null;
          tags?: string[] | null;
          start_at?: string | null;
          end_at?: string | null;
          streak_name?: string | null;
          streak_period?: string | null;
          streak_bonus_eco?: number | null;
          streak_max_steps?: number | null;
          rotation_is_weekly?: boolean | null;
          rotation_iso_year?: number | null;
          rotation_iso_week?: number | null;
          rotation_slot_index?: number | null;
          rotation_starts_on?: string | null;
          rotation_ends_on?: string | null;
          chain_id?: string | null;
          chain_order?: number | null;
          chain_requires_prev?: boolean | null;
          team_allowed?: boolean | null;
          team_min_size?: number | null;
          team_max_size?: number | null;
          team_bonus_eco?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          kind?: Database["public"]["Enums"]["sidequest_kind"];
          status?: Database["public"]["Enums"]["sidequest_status"];
          title?: string;
          subtitle?: string | null;
          description_md?: string | null;
          semantic_profile?: string | null;
          reward_eco?: number | null;
          xp_reward?: number | null;
          max_completions_per_user?: number | null;
          cooldown_days?: number | null;
          hero_image?: string | null;
          card_accent?: string | null;
          difficulty?: string | null;
          impact?: string | null;
          time_estimate_min?: number | null;
          materials?: string[] | null;
          facts?: string[] | null;
          geo_lat?: number | null;
          geo_lon?: number | null;
          geo_radius_m?: number | null;
          geo_locality?: string | null;
          verification_methods?: Database["public"]["Enums"]["verification_method"][] | null;
          tags?: string[] | null;
          start_at?: string | null;
          end_at?: string | null;
          streak_name?: string | null;
          streak_period?: string | null;
          streak_bonus_eco?: number | null;
          streak_max_steps?: number | null;
          rotation_is_weekly?: boolean | null;
          rotation_iso_year?: number | null;
          rotation_iso_week?: number | null;
          rotation_slot_index?: number | null;
          rotation_starts_on?: string | null;
          rotation_ends_on?: string | null;
          chain_id?: string | null;
          chain_order?: number | null;
          chain_requires_prev?: boolean | null;
          team_allowed?: boolean | null;
          team_min_size?: number | null;
          team_max_size?: number | null;
          team_bonus_eco?: number | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 11. TEAMS
      // =====================================================================
      teams: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          invite_code: string | null;
          owner_id: string;
          avatar_url: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          invite_code?: string | null;
          owner_id: string;
          avatar_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          invite_code?: string | null;
          owner_id?: string;
          avatar_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      team_members: {
        Row: {
          team_id: string;
          user_id: string;
          role: string | null;
          joined_at: string | null;
        };
        Insert: {
          team_id: string;
          user_id: string;
          role?: string | null;
          joined_at?: string | null;
        };
        Update: {
          team_id?: string;
          user_id?: string;
          role?: string | null;
          joined_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 12. SUBMISSIONS
      // =====================================================================
      submissions: {
        Row: {
          id: string;
          sidequest_id: string;
          user_id: string;
          team_id: string | null;
          method: Database["public"]["Enums"]["verification_method"];
          state: Database["public"]["Enums"]["submission_state"];
          visibility: Database["public"]["Enums"]["submission_visibility"] | null;
          media_url: string | null;
          instagram_url: string | null;
          caption: string | null;
          location_lat: number | null;
          location_lng: number | null;
          auto_checks: Record<string, unknown> | null;
          notes: string | null;
          base_xp: number | null;
          base_eco: number | null;
          final_xp: number | null;
          final_eco: number | null;
          reward_status: Database["public"]["Enums"]["reward_status"] | null;
          reward_window_start: string | null;
          reward_window_end: string | null;
          had_bonus: boolean | null;
          bonus_type: Database["public"]["Enums"]["bonus_type"] | null;
          reward_hatched: boolean | null;
          created_at: string | null;
          reviewed_at: string | null;
        };
        Insert: {
          id?: string;
          sidequest_id: string;
          user_id: string;
          team_id?: string | null;
          method?: Database["public"]["Enums"]["verification_method"];
          state?: Database["public"]["Enums"]["submission_state"];
          visibility?: Database["public"]["Enums"]["submission_visibility"] | null;
          media_url?: string | null;
          instagram_url?: string | null;
          caption?: string | null;
          location_lat?: number | null;
          location_lng?: number | null;
          auto_checks?: Record<string, unknown> | null;
          notes?: string | null;
          base_xp?: number | null;
          base_eco?: number | null;
          final_xp?: number | null;
          final_eco?: number | null;
          reward_status?: Database["public"]["Enums"]["reward_status"] | null;
          reward_window_start?: string | null;
          reward_window_end?: string | null;
          had_bonus?: boolean | null;
          bonus_type?: Database["public"]["Enums"]["bonus_type"] | null;
          reward_hatched?: boolean | null;
          created_at?: string | null;
          reviewed_at?: string | null;
        };
        Update: {
          id?: string;
          sidequest_id?: string;
          user_id?: string;
          team_id?: string | null;
          method?: Database["public"]["Enums"]["verification_method"];
          state?: Database["public"]["Enums"]["submission_state"];
          visibility?: Database["public"]["Enums"]["submission_visibility"] | null;
          media_url?: string | null;
          instagram_url?: string | null;
          caption?: string | null;
          location_lat?: number | null;
          location_lng?: number | null;
          auto_checks?: Record<string, unknown> | null;
          notes?: string | null;
          base_xp?: number | null;
          base_eco?: number | null;
          final_xp?: number | null;
          final_eco?: number | null;
          reward_status?: Database["public"]["Enums"]["reward_status"] | null;
          reward_window_start?: string | null;
          reward_window_end?: string | null;
          had_bonus?: boolean | null;
          bonus_type?: Database["public"]["Enums"]["bonus_type"] | null;
          reward_hatched?: boolean | null;
          created_at?: string | null;
          reviewed_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 13. FEED ITEMS
      // =====================================================================
      feed_items: {
        Row: {
          id: string;
          submission_id: string | null;
          author_id: string;
          sidequest_id: string | null;
          caption: string | null;
          visibility: Database["public"]["Enums"]["feed_visibility"] | null;
          media: Record<string, unknown> | null;
          reaction_count: number | null;
          comment_count: number | null;
          share_count: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          submission_id?: string | null;
          author_id: string;
          sidequest_id?: string | null;
          caption?: string | null;
          visibility?: Database["public"]["Enums"]["feed_visibility"] | null;
          media?: Record<string, unknown> | null;
          reaction_count?: number | null;
          comment_count?: number | null;
          share_count?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          submission_id?: string | null;
          author_id?: string;
          sidequest_id?: string | null;
          caption?: string | null;
          visibility?: Database["public"]["Enums"]["feed_visibility"] | null;
          media?: Record<string, unknown> | null;
          reaction_count?: number | null;
          comment_count?: number | null;
          share_count?: number | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 14. REACTIONS
      // =====================================================================
      reactions: {
        Row: {
          id: string;
          feed_item_id: string;
          user_id: string;
          kind: Database["public"]["Enums"]["reaction_kind"];
          created_at: string | null;
        };
        Insert: {
          id?: string;
          feed_item_id: string;
          user_id: string;
          kind: Database["public"]["Enums"]["reaction_kind"];
          created_at?: string | null;
        };
        Update: {
          id?: string;
          feed_item_id?: string;
          user_id?: string;
          kind?: Database["public"]["Enums"]["reaction_kind"];
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 15. COMMENTS
      // =====================================================================
      comments: {
        Row: {
          id: string;
          feed_item_id: string;
          user_id: string;
          body: string;
          deleted: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          feed_item_id: string;
          user_id: string;
          body: string;
          deleted?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          feed_item_id?: string;
          user_id?: string;
          body?: string;
          deleted?: boolean | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 17. FRIENDSHIPS
      // =====================================================================
      friendships: {
        Row: {
          id: string;
          user_a: string;
          user_b: string;
          tier: Database["public"]["Enums"]["friendship_tier"] | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_a: string;
          user_b: string;
          tier?: Database["public"]["Enums"]["friendship_tier"] | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_a?: string;
          user_b?: string;
          tier?: Database["public"]["Enums"]["friendship_tier"] | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      friend_requests: {
        Row: {
          id: string;
          from_user: string;
          to_user: string;
          status: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          from_user: string;
          to_user: string;
          status?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          from_user?: string;
          to_user?: string;
          status?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      blocks: {
        Row: {
          blocker_id: string;
          blocked_id: string;
          created_at: string | null;
        };
        Insert: {
          blocker_id: string;
          blocked_id: string;
          created_at?: string | null;
        };
        Update: {
          blocker_id?: string;
          blocked_id?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 18. TOURNAMENTS
      // =====================================================================
      tournaments: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          owner_id: string;
          status: string | null;
          start_at: string | null;
          end_at: string | null;
          config: Record<string, unknown> | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          owner_id: string;
          status?: string | null;
          start_at?: string | null;
          end_at?: string | null;
          config?: Record<string, unknown> | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          owner_id?: string;
          status?: string | null;
          start_at?: string | null;
          end_at?: string | null;
          config?: Record<string, unknown> | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      tournament_participants: {
        Row: {
          id: string;
          tournament_id: string;
          user_id: string | null;
          team_id: string | null;
          score: number | null;
          joined_at: string | null;
        };
        Insert: {
          id?: string;
          tournament_id: string;
          user_id?: string | null;
          team_id?: string | null;
          score?: number | null;
          joined_at?: string | null;
        };
        Update: {
          id?: string;
          tournament_id?: string;
          user_id?: string | null;
          team_id?: string | null;
          score?: number | null;
          joined_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 19. BADGE TYPES
      // =====================================================================
      badge_types: {
        Row: {
          id: string;
          name: string;
          icon: string | null;
          color: string | null;
          kind: string | null;
          max_tier: number | null;
          rule: Record<string, unknown>;
          created_at: string | null;
        };
        Insert: {
          id: string;
          name: string;
          icon?: string | null;
          color?: string | null;
          kind?: string | null;
          max_tier?: number | null;
          rule: Record<string, unknown>;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          icon?: string | null;
          color?: string | null;
          kind?: string | null;
          max_tier?: number | null;
          rule?: Record<string, unknown>;
          created_at?: string | null;
        };
        Relationships: [];
      };

      user_badges: {
        Row: {
          user_id: string;
          badge_id: string;
          tier: number | null;
          earned_at: string | null;
        };
        Insert: {
          user_id: string;
          badge_id: string;
          tier?: number | null;
          earned_at?: string | null;
        };
        Update: {
          user_id?: string;
          badge_id?: string;
          tier?: number | null;
          earned_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 20. QUEST TYPES
      // =====================================================================
      quest_types: {
        Row: {
          id: string;
          label: string;
          cadence: Database["public"]["Enums"]["quest_cadence"];
          base_xp: number | null;
          base_eco: number | null;
          limit_per_window: number | null;
          icon: string | null;
          color: string | null;
          extra_rules: Record<string, unknown> | null;
          created_at: string | null;
        };
        Insert: {
          id: string;
          label: string;
          cadence?: Database["public"]["Enums"]["quest_cadence"];
          base_xp?: number | null;
          base_eco?: number | null;
          limit_per_window?: number | null;
          icon?: string | null;
          color?: string | null;
          extra_rules?: Record<string, unknown> | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          label?: string;
          cadence?: Database["public"]["Enums"]["quest_cadence"];
          base_xp?: number | null;
          base_eco?: number | null;
          limit_per_window?: number | null;
          icon?: string | null;
          color?: string | null;
          extra_rules?: Record<string, unknown> | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 21. TITLE TYPES
      // =====================================================================
      title_types: {
        Row: {
          id: string;
          label: string;
          description: string | null;
          icon: string | null;
          color: string | null;
          xp_boost: number | null;
          priority: number | null;
          is_active: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id: string;
          label: string;
          description?: string | null;
          icon?: string | null;
          color?: string | null;
          xp_boost?: number | null;
          priority?: number | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          label?: string;
          description?: string | null;
          icon?: string | null;
          color?: string | null;
          xp_boost?: number | null;
          priority?: number | null;
          is_active?: boolean | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 22. REWARD CONFIGURATION
      // =====================================================================
      reward_config: {
        Row: {
          id: string;
          config: Record<string, unknown>;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          config: Record<string, unknown>;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          config?: Record<string, unknown>;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      reward_campaigns: {
        Row: {
          id: string;
          name: string;
          active_from: string | null;
          active_until: string | null;
          xp_multiplier: number | null;
          eco_multiplier: number | null;
          trw_boost: number | null;
          community_boost: number | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          active_from?: string | null;
          active_until?: string | null;
          xp_multiplier?: number | null;
          eco_multiplier?: number | null;
          trw_boost?: number | null;
          community_boost?: number | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          active_from?: string | null;
          active_until?: string | null;
          xp_multiplier?: number | null;
          eco_multiplier?: number | null;
          trw_boost?: number | null;
          community_boost?: number | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 23. STUDIO STORES
      // =====================================================================
      studio_stores: {
        Row: {
          id: string;
          user_id: string;
          handle: string | null;
          bio: string | null;
          hero_url: string | null;
          logo_url: string | null;
          theme: Database["public"]["Enums"]["store_theme"] | null;
          accepts_pickup: boolean | null;
          accepts_delivery: boolean | null;
          delivery_radius_km: number | null;
          handling_time_days: number | null;
          shipping_policy: string | null;
          return_policy: string | null;
          free_shipping_threshold_cents: number | null;
          is_approved: boolean | null;
          application_text: string | null;
          applied_at: string | null;
          approved_at: string | null;
          stripe_account_id: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          handle?: string | null;
          bio?: string | null;
          hero_url?: string | null;
          logo_url?: string | null;
          theme?: Database["public"]["Enums"]["store_theme"] | null;
          accepts_pickup?: boolean | null;
          accepts_delivery?: boolean | null;
          delivery_radius_km?: number | null;
          handling_time_days?: number | null;
          shipping_policy?: string | null;
          return_policy?: string | null;
          free_shipping_threshold_cents?: number | null;
          is_approved?: boolean | null;
          application_text?: string | null;
          applied_at?: string | null;
          approved_at?: string | null;
          stripe_account_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          handle?: string | null;
          bio?: string | null;
          hero_url?: string | null;
          logo_url?: string | null;
          theme?: Database["public"]["Enums"]["store_theme"] | null;
          accepts_pickup?: boolean | null;
          accepts_delivery?: boolean | null;
          delivery_radius_km?: number | null;
          handling_time_days?: number | null;
          shipping_policy?: string | null;
          return_policy?: string | null;
          free_shipping_threshold_cents?: number | null;
          is_approved?: boolean | null;
          application_text?: string | null;
          applied_at?: string | null;
          approved_at?: string | null;
          stripe_account_id?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 24. STUDIO ITEMS
      // =====================================================================
      studio_items: {
        Row: {
          id: string;
          store_id: string;
          title: string;
          description: string | null;
          price_cents: number;
          currency: string | null;
          stock: number | null;
          status: string | null;
          category: string | null;
          condition: Database["public"]["Enums"]["item_condition"] | null;
          color: string | null;
          materials: string[] | null;
          tags: string[] | null;
          provenance_tags: string[] | null;
          safety_flags: string[] | null;
          fulfilment_type: Database["public"]["Enums"]["fulfilment_type"] | null;
          shipping_strategy: string | null;
          images: string[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          store_id: string;
          title: string;
          description?: string | null;
          price_cents: number;
          currency?: string | null;
          stock?: number | null;
          status?: string | null;
          category?: string | null;
          condition?: Database["public"]["Enums"]["item_condition"] | null;
          color?: string | null;
          materials?: string[] | null;
          tags?: string[] | null;
          provenance_tags?: string[] | null;
          safety_flags?: string[] | null;
          fulfilment_type?: Database["public"]["Enums"]["fulfilment_type"] | null;
          shipping_strategy?: string | null;
          images?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          store_id?: string;
          title?: string;
          description?: string | null;
          price_cents?: number;
          currency?: string | null;
          stock?: number | null;
          status?: string | null;
          category?: string | null;
          condition?: Database["public"]["Enums"]["item_condition"] | null;
          color?: string | null;
          materials?: string[] | null;
          tags?: string[] | null;
          provenance_tags?: string[] | null;
          safety_flags?: string[] | null;
          fulfilment_type?: Database["public"]["Enums"]["fulfilment_type"] | null;
          shipping_strategy?: string | null;
          images?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 25. STUDIO ORDERS
      // =====================================================================
      studio_orders: {
        Row: {
          id: string;
          item_id: string;
          store_id: string;
          buyer_id: string;
          seller_id: string;
          status: Database["public"]["Enums"]["order_status"] | null;
          amount_cents: number;
          currency: string | null;
          shipping_address: Record<string, unknown> | null;
          tracking_number: string | null;
          tracking_url: string | null;
          stripe_payment_intent: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          item_id: string;
          store_id: string;
          buyer_id: string;
          seller_id: string;
          status?: Database["public"]["Enums"]["order_status"] | null;
          amount_cents: number;
          currency?: string | null;
          shipping_address?: Record<string, unknown> | null;
          tracking_number?: string | null;
          tracking_url?: string | null;
          stripe_payment_intent?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          item_id?: string;
          store_id?: string;
          buyer_id?: string;
          seller_id?: string;
          status?: Database["public"]["Enums"]["order_status"] | null;
          amount_cents?: number;
          currency?: string | null;
          shipping_address?: Record<string, unknown> | null;
          tracking_number?: string | null;
          tracking_url?: string | null;
          stripe_payment_intent?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 26. STUDIO REVIEWS
      // =====================================================================
      studio_reviews: {
        Row: {
          id: string;
          order_id: string;
          reviewer_id: string;
          store_id: string;
          rating: number;
          body: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          reviewer_id: string;
          store_id: string;
          rating: number;
          body?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          reviewer_id?: string;
          store_id?: string;
          rating?: number;
          body?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 27. STUDIO MESSAGES
      // =====================================================================
      studio_messages: {
        Row: {
          id: string;
          order_id: string;
          sender_id: string;
          body: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          order_id: string;
          sender_id: string;
          body: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          order_id?: string;
          sender_id?: string;
          body?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 28. SHIPPING ADDRESSES
      // =====================================================================
      shipping_addresses: {
        Row: {
          id: string;
          user_id: string;
          label: string | null;
          line1: string;
          line2: string | null;
          city: string;
          state: string;
          postcode: string;
          country: string | null;
          is_default: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          label?: string | null;
          line1: string;
          line2?: string | null;
          city: string;
          state: string;
          postcode: string;
          country?: string | null;
          is_default?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          label?: string | null;
          line1?: string;
          line2?: string | null;
          city?: string;
          state?: string;
          postcode?: string;
          country?: string | null;
          is_default?: boolean | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 29. STUDIO BAG ITEMS
      // =====================================================================
      studio_bag_items: {
        Row: {
          id: string;
          user_id: string;
          item_id: string;
          quantity: number | null;
          added_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_id: string;
          quantity?: number | null;
          added_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          item_id?: string;
          quantity?: number | null;
          added_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 30. PUSH TOKENS
      // =====================================================================
      push_tokens: {
        Row: {
          id: string;
          user_id: string;
          token: string;
          platform: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          token: string;
          platform: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          token?: string;
          platform?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 31. PIPELINES
      // =====================================================================
      pipelines: {
        Row: {
          id: string;
          name: string;
          slug: string | null;
          is_active: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug?: string | null;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string | null;
          is_active?: boolean | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 32. PIPELINE STAGES
      // =====================================================================
      pipeline_stages: {
        Row: {
          id: string;
          pipeline_id: string;
          name: string;
          key: string;
          sort_order: number | null;
          color: string | null;
          is_won: boolean | null;
          is_lost: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          pipeline_id: string;
          name: string;
          key: string;
          sort_order?: number | null;
          color?: string | null;
          is_won?: boolean | null;
          is_lost?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          pipeline_id?: string;
          name?: string;
          key?: string;
          sort_order?: number | null;
          color?: string | null;
          is_won?: boolean | null;
          is_lost?: boolean | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 33. PIPELINE CLIENTS
      // =====================================================================
      pipeline_clients: {
        Row: {
          id: string;
          name: string;
          slug: string | null;
          website: string | null;
          notes: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          slug?: string | null;
          website?: string | null;
          notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string | null;
          website?: string | null;
          notes?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 34. PIPELINE PROJECTS
      // =====================================================================
      pipeline_projects: {
        Row: {
          id: string;
          client_id: string;
          pipeline_id: string;
          stage_id: string;
          title: string;
          summary: string | null;
          value_estimate: number | null;
          status: Database["public"]["Enums"]["project_status"] | null;
          priority: number | null;
          tags: string[] | null;
          next_action_at: string | null;
          start_at: string | null;
          target_launch_at: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          client_id: string;
          pipeline_id: string;
          stage_id: string;
          title: string;
          summary?: string | null;
          value_estimate?: number | null;
          status?: Database["public"]["Enums"]["project_status"] | null;
          priority?: number | null;
          tags?: string[] | null;
          next_action_at?: string | null;
          start_at?: string | null;
          target_launch_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          client_id?: string;
          pipeline_id?: string;
          stage_id?: string;
          title?: string;
          summary?: string | null;
          value_estimate?: number | null;
          status?: Database["public"]["Enums"]["project_status"] | null;
          priority?: number | null;
          tags?: string[] | null;
          next_action_at?: string | null;
          start_at?: string | null;
          target_launch_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 35. PIPELINE NOTES
      // =====================================================================
      pipeline_notes: {
        Row: {
          id: string;
          project_id: string;
          type: Database["public"]["Enums"]["pipeline_note_type"] | null;
          body: string;
          pinned: boolean | null;
          created_by: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          type?: Database["public"]["Enums"]["pipeline_note_type"] | null;
          body: string;
          pinned?: boolean | null;
          created_by?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          type?: Database["public"]["Enums"]["pipeline_note_type"] | null;
          body?: string;
          pinned?: boolean | null;
          created_by?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 36. PIPELINE LINKS
      // =====================================================================
      pipeline_links: {
        Row: {
          id: string;
          project_id: string;
          kind: Database["public"]["Enums"]["pipeline_link_kind"] | null;
          label: string;
          url: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          project_id: string;
          kind?: Database["public"]["Enums"]["pipeline_link_kind"] | null;
          label: string;
          url: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string;
          kind?: Database["public"]["Enums"]["pipeline_link_kind"] | null;
          label?: string;
          url?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 37. PIPELINE MEMBERS
      // =====================================================================
      pipeline_members: {
        Row: {
          pipeline_id: string;
          user_id: string;
          role: Database["public"]["Enums"]["pipeline_member_role"] | null;
          created_at: string | null;
        };
        Insert: {
          pipeline_id: string;
          user_id: string;
          role?: Database["public"]["Enums"]["pipeline_member_role"] | null;
          created_at?: string | null;
        };
        Update: {
          pipeline_id?: string;
          user_id?: string;
          role?: Database["public"]["Enums"]["pipeline_member_role"] | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 38. LEDGER ACCOUNTS
      // =====================================================================
      ledger_accounts: {
        Row: {
          id: string;
          org_id: string | null;
          code: string;
          name: string;
          type: Database["public"]["Enums"]["account_type"];
          parent_id: string | null;
          description: string | null;
          is_system: boolean | null;
          is_active: boolean | null;
          tax_default_code: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          org_id?: string | null;
          code: string;
          name: string;
          type: Database["public"]["Enums"]["account_type"];
          parent_id?: string | null;
          description?: string | null;
          is_system?: boolean | null;
          is_active?: boolean | null;
          tax_default_code?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          org_id?: string | null;
          code?: string;
          name?: string;
          type?: Database["public"]["Enums"]["account_type"];
          parent_id?: string | null;
          description?: string | null;
          is_system?: boolean | null;
          is_active?: boolean | null;
          tax_default_code?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 39. LEDGER TRANSACTIONS
      // =====================================================================
      ledger_transactions: {
        Row: {
          id: string;
          org_id: string | null;
          occurred_at: string;
          description: string;
          source_system: Database["public"]["Enums"]["source_system"] | null;
          source_reference_type: string | null;
          source_reference_id: string | null;
          tags: string[] | null;
          recorded_at: string | null;
        };
        Insert: {
          id?: string;
          org_id?: string | null;
          occurred_at: string;
          description: string;
          source_system?: Database["public"]["Enums"]["source_system"] | null;
          source_reference_type?: string | null;
          source_reference_id?: string | null;
          tags?: string[] | null;
          recorded_at?: string | null;
        };
        Update: {
          id?: string;
          org_id?: string | null;
          occurred_at?: string;
          description?: string;
          source_system?: Database["public"]["Enums"]["source_system"] | null;
          source_reference_type?: string | null;
          source_reference_id?: string | null;
          tags?: string[] | null;
          recorded_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 40. LEDGER LINES
      // =====================================================================
      ledger_lines: {
        Row: {
          id: string;
          transaction_id: string;
          account_id: string;
          debit_cents: number | null;
          credit_cents: number | null;
          currency: string | null;
          tax_code: string | null;
          tax_amount_cents: number | null;
          counterparty_id: string | null;
          memo: string | null;
        };
        Insert: {
          id?: string;
          transaction_id: string;
          account_id: string;
          debit_cents?: number | null;
          credit_cents?: number | null;
          currency?: string | null;
          tax_code?: string | null;
          tax_amount_cents?: number | null;
          counterparty_id?: string | null;
          memo?: string | null;
        };
        Update: {
          id?: string;
          transaction_id?: string;
          account_id?: string;
          debit_cents?: number | null;
          credit_cents?: number | null;
          currency?: string | null;
          tax_code?: string | null;
          tax_amount_cents?: number | null;
          counterparty_id?: string | null;
          memo?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 41. BILLING PROFILES
      // =====================================================================
      billing_profiles: {
        Row: {
          id: string;
          project_id: string | null;
          client_id: string | null;
          status: Database["public"]["Enums"]["billing_profile_status"] | null;
          mode: Database["public"]["Enums"]["billing_mode"] | null;
          currency: string | null;
          base_support_retainer: number | null;
          cost_markup: number | null;
          rounding_mode: Database["public"]["Enums"]["rounding_mode"] | null;
          cost_estimate: number | null;
          monthly_price: number | null;
          monthly_price_locked: boolean | null;
          margin_estimate: number | null;
          auto_bill_enabled: boolean | null;
          billing_email: string | null;
          stripe_link_status: string | null;
          next_run_at: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          project_id?: string | null;
          client_id?: string | null;
          status?: Database["public"]["Enums"]["billing_profile_status"] | null;
          mode?: Database["public"]["Enums"]["billing_mode"] | null;
          currency?: string | null;
          base_support_retainer?: number | null;
          cost_markup?: number | null;
          rounding_mode?: Database["public"]["Enums"]["rounding_mode"] | null;
          cost_estimate?: number | null;
          monthly_price?: number | null;
          monthly_price_locked?: boolean | null;
          margin_estimate?: number | null;
          auto_bill_enabled?: boolean | null;
          billing_email?: string | null;
          stripe_link_status?: string | null;
          next_run_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          project_id?: string | null;
          client_id?: string | null;
          status?: Database["public"]["Enums"]["billing_profile_status"] | null;
          mode?: Database["public"]["Enums"]["billing_mode"] | null;
          currency?: string | null;
          base_support_retainer?: number | null;
          cost_markup?: number | null;
          rounding_mode?: Database["public"]["Enums"]["rounding_mode"] | null;
          cost_estimate?: number | null;
          monthly_price?: number | null;
          monthly_price_locked?: boolean | null;
          margin_estimate?: number | null;
          auto_bill_enabled?: boolean | null;
          billing_email?: string | null;
          stripe_link_status?: string | null;
          next_run_at?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 42. NEWSLETTER TEMPLATES
      // =====================================================================
      newsletter_templates: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          schema: Record<string, unknown> | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          schema?: Record<string, unknown> | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          schema?: Record<string, unknown> | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 43. NEWSLETTER CAMPAIGNS
      // =====================================================================
      newsletter_campaigns: {
        Row: {
          id: string;
          template_id: string | null;
          name: string;
          subject: string;
          preheader: string | null;
          status: Database["public"]["Enums"]["newsletter_status"] | null;
          blocks: Record<string, unknown> | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          template_id?: string | null;
          name: string;
          subject?: string;
          preheader?: string | null;
          status?: Database["public"]["Enums"]["newsletter_status"] | null;
          blocks?: Record<string, unknown> | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          template_id?: string | null;
          name?: string;
          subject?: string;
          preheader?: string | null;
          status?: Database["public"]["Enums"]["newsletter_status"] | null;
          blocks?: Record<string, unknown> | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 44. NEWSLETTER SEND LOGS
      // =====================================================================
      newsletter_send_logs: {
        Row: {
          id: string;
          campaign_id: string;
          attempted: number | null;
          sent: number | null;
          failed: number | null;
          results: Record<string, unknown> | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          campaign_id: string;
          attempted?: number | null;
          sent?: number | null;
          failed?: number | null;
          results?: Record<string, unknown> | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          campaign_id?: string;
          attempted?: number | null;
          sent?: number | null;
          failed?: number | null;
          results?: Record<string, unknown> | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 45a. RECRUIT PROSPECTS
      // =====================================================================
      recruit_prospects: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          website: string | null;
          address: string | null;
          status: string | null;
          notes: string | null;
          tags: string[] | null;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          website?: string | null;
          address?: string | null;
          status?: string | null;
          notes?: string | null;
          tags?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          website?: string | null;
          address?: string | null;
          status?: string | null;
          notes?: string | null;
          tags?: string[] | null;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 45b. RECRUIT RUNS
      // =====================================================================
      recruit_runs: {
        Row: {
          id: string;
          name: string;
          status: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          status?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          status?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };

      // =====================================================================
      // 45c. RECRUIT MESSAGES
      // =====================================================================
      recruit_messages: {
        Row: {
          id: string;
          prospect_id: string;
          run_id: string | null;
          direction: string;
          channel: string | null;
          body: string;
          sent_at: string | null;
        };
        Insert: {
          id?: string;
          prospect_id: string;
          run_id?: string | null;
          direction: string;
          channel?: string | null;
          body: string;
          sent_at?: string | null;
        };
        Update: {
          id?: string;
          prospect_id?: string;
          run_id?: string | null;
          direction?: string;
          channel?: string | null;
          body?: string;
          sent_at?: string | null;
        };
        Relationships: [];
      };
    };

    // =====================================================================
    // VIEWS (Materialized)
    // =====================================================================
    Views: {
      leaderboard_eco_weekly: {
        Row: {
          user_id: string;
          eco: number | null;
          rank: number | null;
        };
        Relationships: [];
      };
      leaderboard_eco_monthly: {
        Row: {
          user_id: string;
          eco: number | null;
          rank: number | null;
        };
        Relationships: [];
      };
      leaderboard_eco_total: {
        Row: {
          user_id: string;
          eco: number | null;
          rank: number | null;
        };
        Relationships: [];
      };
    };

    // =====================================================================
    // ENUMS
    // =====================================================================
    Enums: {
      // User system
      user_role: "youth" | "business" | "creative" | "partner" | "admin";

      // Sidequests
      sidequest_kind: "core" | "eco_action" | "daily" | "weekly" | "tournament" | "team" | "chain";
      sidequest_status: "draft" | "active" | "archived";
      verification_method: "photo_upload" | "instagram_link";
      submission_state: "pending" | "approved" | "rejected";
      submission_visibility: "public" | "friends" | "private";
      reward_status: "pending" | "resolved";
      bonus_type: "boost" | "jackpot";

      // Feed
      feed_visibility: "public" | "friends" | "private" | "local";
      reaction_kind: "eco" | "wow" | "cheer" | "fire" | "leaf";

      // Social
      friendship_tier: "seedling" | "sapling" | "canopy" | "elder";

      // Business / Eco-Local
      business_type: "in_store" | "online" | "hybrid" | "online_only";
      pledge_tier: "starter" | "builder" | "leader";
      offer_type: "discount" | "free_item" | "bonus" | "experience" | "gift" | "custom";
      offer_status: "active" | "paused" | "hidden";
      redemption_mode: "in_store_qr" | "online_code" | "hybrid" | "in_person" | "code" | "link";
      voucher_status: "issued" | "verified" | "consumed" | "expired" | "void";
      eco_tx_kind: "mint_action" | "burn_reward" | "contribute" | "sponsor_deposit" | "sponsor_payout";
      eco_tx_direction: "earned" | "spent";

      // Studio
      item_condition: "new" | "like_new" | "good" | "fair";
      store_theme: "archive" | "boutique" | "studio" | "tide" | "poster" | "neon" | "grove" | "grunge";
      order_status: "pending" | "paid" | "preparing" | "shipped" | "delivered" | "cancelled";
      fulfilment_type: "pickup" | "delivery" | "both";

      // Gamification
      quest_cadence: "once" | "daily" | "weekly" | "monthly" | "seasonal";

      // Pipeline (admin CRM)
      project_status: "active" | "on_hold" | "done" | "archived";
      pipeline_note_type: "note" | "call" | "email" | "meeting" | "decision";
      pipeline_link_kind: "figma" | "github" | "doc" | "invoice" | "contract" | "vercel" | "other";
      pipeline_member_role: "viewer" | "editor" | "owner";

      // Billing
      billing_profile_status: "draft" | "configured" | "pending_customer" | "active" | "paused" | "cancelled";
      billing_mode: "support_retainer" | "managed_hosting_support" | "pass_through";
      rounding_mode: "none" | "round_10" | "round_50" | "round_100" | "to_399";

      // Banking / Ledger
      account_type: "asset" | "liability" | "equity" | "income" | "expense" | "other";
      source_system: "manual" | "stripe" | "studio" | "eco_local" | "payroll" | "import";

      // Newsletter
      newsletter_status: "draft" | "sent";
    };

    // =====================================================================
    // FUNCTIONS
    // =====================================================================
    Functions: {
      is_admin: {
        Args: Record<string, never>;
        Returns: boolean;
      };
      has_cap: {
        Args: { cap: string };
        Returns: boolean;
      };
    };
  };
};

// =============================================================================
// Convenience type helpers
// =============================================================================

/** Shorthand to extract a Row type for any table */
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

/** Shorthand to extract an Insert type for any table */
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

/** Shorthand to extract an Update type for any table */
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

/** Shorthand to extract a View Row type */
export type Views<T extends keyof Database["public"]["Views"]> =
  Database["public"]["Views"][T]["Row"];

/** Shorthand to extract an Enum type */
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];
