import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker"
import { useAuth } from "@/context/AuthContext"
import { Navigation } from "lucide-react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AddTripDrawer from "./components/add-trip-drawer"
import TripCard from "./components/trip-card"

function Home() {
    const user = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/auth')
        }
    }, [user])
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2 flex flex-col sm:flex-row">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <div className="flex items-center space-x-2">
                    <CalendarDateRangePicker />
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Distance
                        </CardTitle>
                        <Navigation className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,201.5 km</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Time
                        </CardTitle>
                        <Navigation className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">201 minutes</div>
                        <p className="text-xs text-muted-foreground">
                            +10.6% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="border-t border-divider" />
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Recent trips</h2>
            </div>
            <div className="grid gap-4">
                <TripCard from="Göteborg, Sweden" to="Stockholm, Sweden" distance={468} />
                <AddTripDrawer />
            </div>
        </div>
    )
}

export default Home