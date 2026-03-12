import type { Database } from "./database";

// ---------------------------------------------------------------------------
// Convenience helpers
// ---------------------------------------------------------------------------
type Tables = Database["public"]["Tables"];
type Enums = Database["public"]["Enums"];
type Views = Database["public"]["Views"];

// ---------------------------------------------------------------------------
// Enum types
// ---------------------------------------------------------------------------
export type UserRole = Enums["user_role"];
export type SidequestKind = Enums["sidequest_kind"];
export type SidequestStatus = Enums["sidequest_status"];
export type VerificationMethod = Enums["verification_method"];
export type SubmissionState = Enums["submission_state"];
export type SubmissionVisibility = Enums["submission_visibility"];
export type RewardStatus = Enums["reward_status"];
export type BonusType = Enums["bonus_type"];
export type FeedVisibility = Enums["feed_visibility"];
export type ReactionKind = Enums["reaction_kind"];
export type FriendshipTier = Enums["friendship_tier"];
export type BusinessType = Enums["business_type"];
export type PledgeTier = Enums["pledge_tier"];
export type OfferType = Enums["offer_type"];
export type OfferStatus = Enums["offer_status"];
export type RedemptionMode = Enums["redemption_mode"];
export type VoucherStatus = Enums["voucher_status"];
export type EcoTxKind = Enums["eco_tx_kind"];
export type EcoTxDirection = Enums["eco_tx_direction"];
export type ItemCondition = Enums["item_condition"];
export type StoreTheme = Enums["store_theme"];
export type OrderStatus = Enums["order_status"];
export type FulfilmentType = Enums["fulfilment_type"];
export type QuestCadence = Enums["quest_cadence"];
export type ProjectStatus = Enums["project_status"];
export type PipelineNoteType = Enums["pipeline_note_type"];
export type PipelineLinkKind = Enums["pipeline_link_kind"];
export type PipelineMemberRole = Enums["pipeline_member_role"];
export type BillingProfileStatus = Enums["billing_profile_status"];
export type BillingMode = Enums["billing_mode"];
export type RoundingMode = Enums["rounding_mode"];
export type AccountType = Enums["account_type"];
export type SourceSystem = Enums["source_system"];
export type NewsletterStatus = Enums["newsletter_status"];

// ---------------------------------------------------------------------------
// Table row types
// ---------------------------------------------------------------------------
export type Profile = Tables["profiles"]["Row"];
export type HomeLayout = Tables["home_layouts"]["Row"];
export type Ban = Tables["bans"]["Row"];

export type Business = Tables["businesses"]["Row"];
export type BusinessMetrics = Tables["business_metrics"]["Row"];
export type Offer = Tables["offers"]["Row"];
export type Voucher = Tables["vouchers"]["Row"];

export type EcoTransaction = Tables["eco_transactions"]["Row"];
export type BusinessActivity = Tables["business_activity"]["Row"];

export type Sidequest = Tables["sidequests"]["Row"];
export type Submission = Tables["submissions"]["Row"];
export type Team = Tables["teams"]["Row"];
export type TeamMember = Tables["team_members"]["Row"];

export type FeedItem = Tables["feed_items"]["Row"];
export type Reaction = Tables["reactions"]["Row"];
export type Comment = Tables["comments"]["Row"];

export type Friendship = Tables["friendships"]["Row"];
export type FriendRequest = Tables["friend_requests"]["Row"];
export type Block = Tables["blocks"]["Row"];

export type Tournament = Tables["tournaments"]["Row"];
export type TournamentParticipant = Tables["tournament_participants"]["Row"];

export type BadgeType = Tables["badge_types"]["Row"];
export type UserBadge = Tables["user_badges"]["Row"];
export type QuestType = Tables["quest_types"]["Row"];
export type TitleType = Tables["title_types"]["Row"];
export type RewardConfig = Tables["reward_config"]["Row"];
export type RewardCampaign = Tables["reward_campaigns"]["Row"];

export type StudioStore = Tables["studio_stores"]["Row"];
export type StudioItem = Tables["studio_items"]["Row"];
export type StudioOrder = Tables["studio_orders"]["Row"];
export type StudioReview = Tables["studio_reviews"]["Row"];
export type StudioMessage = Tables["studio_messages"]["Row"];
export type ShippingAddress = Tables["shipping_addresses"]["Row"];
export type StudioBagItem = Tables["studio_bag_items"]["Row"];

export type PushToken = Tables["push_tokens"]["Row"];

export type Pipeline = Tables["pipelines"]["Row"];
export type PipelineStage = Tables["pipeline_stages"]["Row"];
export type PipelineClient = Tables["pipeline_clients"]["Row"];
export type PipelineProject = Tables["pipeline_projects"]["Row"];
export type PipelineNote = Tables["pipeline_notes"]["Row"];
export type PipelineLink = Tables["pipeline_links"]["Row"];
export type PipelineMember = Tables["pipeline_members"]["Row"];

export type LedgerAccount = Tables["ledger_accounts"]["Row"];
export type LedgerTransaction = Tables["ledger_transactions"]["Row"];
export type LedgerLine = Tables["ledger_lines"]["Row"];

export type BillingProfile = Tables["billing_profiles"]["Row"];

export type NewsletterTemplate = Tables["newsletter_templates"]["Row"];
export type NewsletterCampaign = Tables["newsletter_campaigns"]["Row"];
export type NewsletterSendLog = Tables["newsletter_send_logs"]["Row"];

export type RecruitProspect = Tables["recruit_prospects"]["Row"];
export type RecruitRun = Tables["recruit_runs"]["Row"];
export type RecruitMessage = Tables["recruit_messages"]["Row"];

// ---------------------------------------------------------------------------
// Materialized view types
// ---------------------------------------------------------------------------
export type LeaderboardEcoWeekly = Views["leaderboard_eco_weekly"]["Row"];
export type LeaderboardEcoMonthly = Views["leaderboard_eco_monthly"]["Row"];
export type LeaderboardEcoTotal = Views["leaderboard_eco_total"]["Row"];

// ---------------------------------------------------------------------------
// Insert / Update helpers (use when you need them)
// ---------------------------------------------------------------------------
export type ProfileInsert = Tables["profiles"]["Insert"];
export type ProfileUpdate = Tables["profiles"]["Update"];
export type BusinessInsert = Tables["businesses"]["Insert"];
export type BusinessUpdate = Tables["businesses"]["Update"];
export type SubmissionInsert = Tables["submissions"]["Insert"];
export type SubmissionUpdate = Tables["submissions"]["Update"];
export type EcoTransactionInsert = Tables["eco_transactions"]["Insert"];

// ---------------------------------------------------------------------------
// Feature Flags (migration 00002 - not yet in generated DB types)
// ---------------------------------------------------------------------------
export type FeatureFlag = {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rollout_pct: number;
  target_caps: string[];
  updated_at: string;
  updated_by: string | null;
};

// ---------------------------------------------------------------------------
// Tournament status
// ---------------------------------------------------------------------------
export type TournamentStatus = "upcoming" | "active" | "ended" | "cancelled";
