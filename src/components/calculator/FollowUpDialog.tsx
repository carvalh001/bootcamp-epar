// src/components/calculator/FollowUpDialog.tsx
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Check, X, Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { useCalculatorSession } from '@/contexts/CalculatorSessionContext'

interface FollowUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const FollowUpDialog: React.FC<FollowUpDialogProps> = ({ open, onOpenChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState('')
  const { sessionId: lastSubmissionId } = useCalculatorSession()

  const handleNo = () => {
    onOpenChange(false)
  }

  const handleYes = () => {
    setShowDatePicker(true)
  }

  const handleSchedule = async () => {
    if (!date || !time || !lastSubmissionId) return

    const formattedDate = format(date, 'yyyy-MM-dd', { locale: ptBR })
    const payload = {
      submission_id: lastSubmissionId,
      date: formattedDate,
      time,
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
      const res = await fetch(`${API_BASE_URL}/follow-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || res.statusText)
      }

      toast.success(
        `Agendado para ${format(date, 'dd/MM/yyyy', { locale: ptBR })} às ${time}`
      )
      onOpenChange(false)
    } catch (err: any) {
      console.error('Erro no agendamento:', err)
      toast.error(err.message || 'Não foi possível agendar. Tente novamente.')
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {!showDatePicker
              ? 'Deseja receber maiores informações?'
              : 'Agende o melhor horário para contato'}
          </DialogTitle>
          <DialogDescription>
            {!showDatePicker
              ? 'Seu e-mail foi enviado com sucesso! Podemos entrar em contato para fornecer mais informações?'
              : 'Selecione a data e horário de sua preferência para nossa equipe entrar em contato.'}
          </DialogDescription>
        </DialogHeader>

        {!showDatePicker ? (
          <div className="flex justify-center gap-4 mt-4">
            <Button
              onClick={handleYes}
              className="bg-realestate-primary hover:bg-realestate-dark flex items-center gap-2"
            >
              <Check className="h-4 w-4" />
              Sim
            </Button>
            <Button onClick={handleNo} variant="outline" className="flex items-center gap-2">
              <X className="h-4 w-4" />
              Não
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Seletor de Data */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Data</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start text-left font-normal',
                      !date && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP', { locale: ptBR }) : 'Selecione uma data'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={ptBR}
                    disabled={(d) => d < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Seletor de Hora */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Horário preferido</label>
              <select
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="">Selecione um horário</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
              </select>
            </div>

            {/* Botões Voltar / Agendar */}
            <div className="flex justify-end gap-4 mt-4">
              <Button onClick={() => setShowDatePicker(false)} variant="outline">
                Voltar
              </Button>
              <Button
                onClick={handleSchedule}
                disabled={!date || !time}
                className="bg-realestate-primary hover:bg-realestate-dark"
              >
                Agendar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default FollowUpDialog
