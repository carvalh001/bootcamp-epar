export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          password: string
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          password: string
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          password?: string
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      calculator_submissions: {
        Row: {
          annual_revenue: number | null
          average_commission: number
          average_contract_duration: number
          average_rent: number
          city: string | null
          commercial_percentage: number | null
          contact_info_id: string | null
          contract_length: number | null
          contract_type: string | null
          contracts_expiring_12_months: number
          contracts_expiring_12_to_24_months: number
          contracts_expiring_24_to_36_months: number
          contracts_expiring_over_36_months: number
          default_rate: number
          estoque_atual: number | null
          expired_indefinite_contracts: number
          growth_rate: number | null
          id: string
          ip_address: string | null
          is_submitted: boolean | null
          monthly_revenue: number | null
          new_contracts_per_month: number
          num_properties: number
          occupancy_rate: number
          portfolio_value: number | null
          potential_growth: number | null
          predominant_guarantee_type: string
          residential_percentage: number | null
          stability_score: number | null
          state: string | null
          terminated_contracts_per_month: number
          timestamp: string | null
          valor_criterio: number | null
        }
        Insert: {
          annual_revenue?: number | null
          average_commission: number
          average_contract_duration: number
          average_rent: number
          city?: string | null
          commercial_percentage?: number | null
          contact_info_id?: string | null
          contract_length?: number | null
          contract_type?: string | null
          contracts_expiring_12_months: number
          contracts_expiring_12_to_24_months: number
          contracts_expiring_24_to_36_months: number
          contracts_expiring_over_36_months: number
          default_rate: number
          estoque_atual?: number | null
          expired_indefinite_contracts: number
          growth_rate?: number | null
          id?: string
          ip_address?: string | null
          is_submitted?: boolean | null
          monthly_revenue?: number | null
          new_contracts_per_month: number
          num_properties: number
          occupancy_rate: number
          portfolio_value?: number | null
          potential_growth?: number | null
          predominant_guarantee_type: string
          residential_percentage?: number | null
          stability_score?: number | null
          state?: string | null
          terminated_contracts_per_month: number
          timestamp?: string | null
          valor_criterio?: number | null
        }
        Update: {
          annual_revenue?: number | null
          average_commission?: number
          average_contract_duration?: number
          average_rent?: number
          city?: string | null
          commercial_percentage?: number | null
          contact_info_id?: string | null
          contract_length?: number | null
          contract_type?: string | null
          contracts_expiring_12_months?: number
          contracts_expiring_12_to_24_months?: number
          contracts_expiring_24_to_36_months?: number
          contracts_expiring_over_36_months?: number
          default_rate?: number
          estoque_atual?: number | null
          expired_indefinite_contracts?: number
          growth_rate?: number | null
          id?: string
          ip_address?: string | null
          is_submitted?: boolean | null
          monthly_revenue?: number | null
          new_contracts_per_month?: number
          num_properties?: number
          occupancy_rate?: number
          portfolio_value?: number | null
          potential_growth?: number | null
          predominant_guarantee_type?: string
          residential_percentage?: number | null
          stability_score?: number | null
          state?: string | null
          terminated_contracts_per_month?: number
          timestamp?: string | null
          valor_criterio?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "calculator_submissions_contact_info_id_fkey"
            columns: ["contact_info_id"]
            isOneToOne: false
            referencedRelation: "contact_info"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_info: {
        Row: {
          city: string | null
          company: string | null
          created_at: string | null
          email: string | null
          id: string
          name: string | null
          phone: string | null
          state: string | null
        }
        Insert: {
          city?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          state?: string | null
        }
        Update: {
          city?: string | null
          company?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string | null
          phone?: string | null
          state?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
