// src/pages/DashboardPage.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
// import { CalendarDateRangePicker } from "@/components/DateRangePicker"
// import { OverviewChart } from "@/components/OverviewChart"

const AdminDashboard = () => {
  const stats = [
    { title: "Commandes", value: "145", change: "+25%" },
    { title: "CA", value: "25 400 €", change: "+12%" },
    { title: "Nouveaux clients", value: "32", change: "+8%" },
    { title: "Stock alerte", value: "5", change: "-4%" }
  ]

  const recentOrders = [
    { id: "CMD001", client: "Julie Martin", date: "2024-03-15", total: "250 €" },
    { id: "CMD002", client: "Paul Dubois", date: "2024-03-14", total: "180 €" },
    { id: "CMD003", client: "Sophie Lefèvre", date: "2024-03-13", total: "420 €" }
  ]

  return (
    <div className="space-y-6">
      {/* Section header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tableau de bord</h2>
        {/* <CalendarDateRangePicker /> */}
      </div>

      {/* Statistiques clés */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <Card key={stat.title}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground">{stat.change}</span>
                <Progress value={75} className="w-full h-2 bg-primary/20" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Graphique et commandes récentes */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Vue d'ensemble</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <OverviewChart /> */}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Dernières commandes</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map(order => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.client}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard