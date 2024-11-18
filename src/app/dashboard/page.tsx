'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"


interface FormData {
    name: string;
    age: string;
    file: File | null; 
  }

  // just a mock data used for display only don't bother much about it
  const analyticsData = [
    { month: 'Jan', patients: 65, appointments: 45, revenue: 8400 },
    { month: 'Feb', patients: 78, appointments: 52, revenue: 9200 },
    { month: 'Mar', patients: 90, appointments: 63, revenue: 10600 },
    { month: 'Apr', patients: 81, appointments: 58, revenue: 9800 },
    { month: 'May', patients: 95, appointments: 71, revenue: 11200 },
    { month: 'Jun', patients: 110, appointments: 82, revenue: 13400 },
  ]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
}

export default function Dashboard() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: '',
    file: null
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Healthcare Dashboard
          </h1>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white/50 backdrop-blur-sm p-1 rounded-full">
            <TabsTrigger value="overview" className="rounded-full">Overview</TabsTrigger>
            <TabsTrigger value="new-patient" className="rounded-full">New Patient</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-full">Analytics</TabsTrigger>
          </TabsList>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <TabsContent value="overview">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-3 gap-6"
                >
                  {['Total Patients', 'Active Cases', "Today's Appointments"].map((title, index) => (
                    <motion.div
                      key={`analytics-${index}-${title}`} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      className="transform transition-all duration-300"
                    >
                      <Card className="bg-white/70 backdrop-blur-sm hover:shadow-lg">
                        <CardHeader>
                          <CardTitle>{title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                            {[2345, 456, 28][index]}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </TabsContent>

              <TabsContent value="new-patient">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg p-8"
                >
                  <form className="space-y-6 max-w-2xl mx-auto">
                    {/* Form fields with enhanced animations */}
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="name" className="text-gray-700">Patient Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </motion.div>

                    <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="space-y-2"
                    >
                    <Label htmlFor="age" className="text-gray-700">Age</Label>
                    <Select
                        value={formData.age}
                        onValueChange={(value) => setFormData({ ...formData, age: value })}
                    >
                        <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select age" />
                        </SelectTrigger>
                        <SelectContent>
                        {Array.from({ length: 100 }, (_, i) => i + 1).map((age) => (
                            <SelectItem key={`age-${age}`} value={age.toString()}>
                            {age} years
                            </SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="file" className="text-gray-700">Medical Records</Label>
                      <Input
                        id="file"
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setFormData({ ...formData, file });
                        }}
                        className="transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                      />
                    </motion.div>

                    <Dialog>
                      <DialogTrigger asChild>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                            Submit Patient Information
                          </Button>
                        </motion.div>
                      </DialogTrigger>
                      <DialogContent className="bg-white/80 backdrop-blur-md">
                        <DialogHeader>
                          <DialogTitle>Success!</DialogTitle>
                          <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                          >
                            Patient information has been saved successfully.
                          </motion.p>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </form>
                </motion.div>
              </TabsContent>
              <TabsContent value="analytics">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="grid md:grid-cols-2 gap-6">
                        {/* patients and appointments chart */}
                        <Card className="bg-white/70 backdrop-blur-sm">
                            <CardHeader>
                            <CardTitle>Patient & Appointment Trends</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analyticsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                    }}
                                    />
                                    <Legend />
                                    <Line 
                                    type="monotone" 
                                    dataKey="patients" 
                                    stroke="#2563eb" 
                                    strokeWidth={2}
                                    name="Patients"
                                    />
                                    <Line 
                                    type="monotone" 
                                    dataKey="appointments" 
                                    stroke="#7c3aed" 
                                    strokeWidth={2}
                                    name="Appointments"
                                    />
                                </LineChart>
                                </ResponsiveContainer>
                            </div>
                            </CardContent>
                        </Card>

                        {/* revenue chart */}
                        <Card className="bg-white/70 backdrop-blur-sm">
                            <CardHeader>
                            <CardTitle>Revenue Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analyticsData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis 
                                    tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                                    }}
                                    formatter={(value) => [`$${value}`, 'Revenue']}
                                    />
                                    <Legend />
                                    <Line 
                                    type="monotone" 
                                    dataKey="revenue" 
                                    stroke="#059669" 
                                    strokeWidth={2}
                                    name="Revenue"
                                    />
                                </LineChart>
                                </ResponsiveContainer>
                            </div>
                            </CardContent>
                        </Card>
                        </div>

                        {/* summary card */}
                        <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                            title: 'Total Patients',
                            value: '519',
                            change: '+12%',
                            color: 'text-blue-600'
                            },
                            {
                            title: 'Total Appointments',
                            value: '371',
                            change: '+8%',
                            color: 'text-purple-600'
                            },
                            {
                            title: 'Total Revenue',
                            value: '$62,600',
                            change: '+15%',
                            color: 'text-emerald-600'
                            }
                        ].map((item, index) => (
                            <motion.div
                            key={`summary-${index}-${item.title}`}
                            whileHover={{ scale: 1.02 }}
                            className="bg-white/70 backdrop-blur-sm rounded-lg p-6"
                            >
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
                            <p className="text-sm text-gray-600 mt-1">{item.change} from last month</p>
                            </motion.div>
                        ))}
                        </div>
                    </motion.div>
                    </TabsContent>
            </AnimatePresence>
          </div>
        </Tabs>
      </main>
    </div>
  )
}
