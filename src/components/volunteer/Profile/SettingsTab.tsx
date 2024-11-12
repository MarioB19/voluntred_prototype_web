import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { defaultPrivacySettings, defaultNotificationSettings } from "@/data/volunteer/Profile"

export default function SettingsTab() {
  const [privacySettings, setPrivacySettings] = useState(defaultPrivacySettings)
  const [notificationSettings, setNotificationSettings] = useState(defaultNotificationSettings)

  return (
    <Card className="bg-gray-900 border-blue-500">
      <CardHeader>
        <CardTitle className="text-green-400">Configuración de la Cuenta</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Preferencias de Privacidad</h3>
            <div className="space-y-4">
              {Object.entries(privacySettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="text-white">
                    {key === 'showEmail' ? 'Mostrar Email' : key === 'showBio' ? 'Mostrar Biografía' : 'Mostrar Habilidades'}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, [key]: checked }))}
                    className="bg-gray-300 data-[state=checked]:bg-green-500" // Personaliza el color del Switch
                  />
                </div>
              ))}
            </div>
          </div>
          <Separator className="bg-blue-500" />
          <div>
            <h3 className="text-lg font-semibold text-blue-400 mb-4">Gestión de Notificaciones</h3>
            <div className="space-y-4">
              {Object.entries(notificationSettings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="text-white">
                    {key === 'emailNotifications' ? 'Notificaciones por Email' : 
                     key === 'pushNotifications' ? 'Notificaciones Push' : 'Recordatorios de Eventos'}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => setNotificationSettings(prev => ({ ...prev, [key]: checked }))}
                    className="bg-gray-300 data-[state=checked]:bg-green-500" // Personaliza el color del Switch
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
