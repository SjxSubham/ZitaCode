import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ThemeToggleButton from '@/components/ThemeToggleButton'

function Page() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Quiz Center</h1>
          <ThemeToggleButton />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Technical Quiz</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Test your technical knowledge and improve your skills with our interactive quiz!</p>
            <Link href="/support/quiz">
              <Button>Start Quiz</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page