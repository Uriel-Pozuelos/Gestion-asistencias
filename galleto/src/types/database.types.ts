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
      codigos: {
        Row: {
          codigo: string | null
          created_at: string
          id: number
        }
        Insert: {
          codigo?: string | null
          created_at?: string
          id?: number
        }
        Update: {
          codigo?: string | null
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      galletas: {
        Row: {
          id: number
          nombre: string | null
          precio: number | null
          stock: number | null
        }
        Insert: {
          id?: number
          nombre?: string | null
          precio?: number | null
          stock?: number | null
        }
        Update: {
          id?: number
          nombre?: string | null
          precio?: number | null
          stock?: number | null
        }
        Relationships: []
      }
      inventario: {
        Row: {
          cantidad: number | null
          id: number
          producto: string | null
        }
        Insert: {
          cantidad?: number | null
          id?: number
          producto?: string | null
        }
        Update: {
          cantidad?: number | null
          id?: number
          producto?: string | null
        }
        Relationships: []
      }
      perdida: {
        Row: {
          cantidad: number | null
          cookie: string | null
          fecha: string | null
          id: number
          nombre: string | null
          sales: number | null
          total: number | null
          typeventa: string | null
        }
        Insert: {
          cantidad?: number | null
          cookie?: string | null
          fecha?: string | null
          id?: number
          nombre?: string | null
          sales?: number | null
          total?: number | null
          typeventa?: string | null
        }
        Update: {
          cantidad?: number | null
          cookie?: string | null
          fecha?: string | null
          id?: number
          nombre?: string | null
          sales?: number | null
          total?: number | null
          typeventa?: string | null
        }
        Relationships: []
      }
      perdidas: {
        Row: {
          id: number
          name: string | null
          sales: number | null
        }
        Insert: {
          id?: number
          name?: string | null
          sales?: number | null
        }
        Update: {
          id?: number
          name?: string | null
          sales?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          email: string | null
          id: number
          role: Database["public"]["Enums"]["role"] | null
        }
        Insert: {
          email?: string | null
          id?: number
          role?: Database["public"]["Enums"]["role"] | null
        }
        Update: {
          email?: string | null
          id?: number
          role?: Database["public"]["Enums"]["role"] | null
        }
        Relationships: []
      }
      users: {
        Row: {
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
        }
        Insert: {
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
        }
        Update: {
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
        }
        Relationships: []
      }
      usuarios: {
        Row: {
          correo: string | null
          id: number
          nombre: string | null
          password: string | null
        }
        Insert: {
          correo?: string | null
          id?: number
          nombre?: string | null
          password?: string | null
        }
        Update: {
          correo?: string | null
          id?: number
          nombre?: string | null
          password?: string | null
        }
        Relationships: []
      }
      venta: {
        Row: {
          cantidad: number | null
          cookie: string | null
          fecha: string | null
          id: number
          nombre: string | null
          precio: number | null
          precioventa: number | null
          total: number | null
          typeventa: string | null
        }
        Insert: {
          cantidad?: number | null
          cookie?: string | null
          fecha?: string | null
          id?: number
          nombre?: string | null
          precio?: number | null
          precioventa?: number | null
          total?: number | null
          typeventa?: string | null
        }
        Update: {
          cantidad?: number | null
          cookie?: string | null
          fecha?: string | null
          id?: number
          nombre?: string | null
          precio?: number | null
          precioventa?: number | null
          total?: number | null
          typeventa?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_email_from_auth_users:
        | {
            Args: {
              user_email: string
            }
            Returns: {
              email: string
            }[]
          }
        | {
            Args: {
              user_id: string
            }
            Returns: {
              email: string
            }[]
          }
      get_user_id_by_email: {
        Args: {
          email: string
        }
        Returns: {
          id: string
        }[]
      }
    }
    Enums: {
      role: "admin" | "contador" | "vendedor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
