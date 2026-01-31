import React from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ThemeToggleButton from '@/components/ThemeToggleButton'

function Page() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/" className="flex items-center gap-3 group relative">
    
    <div
      className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 
        group-hover:opacity-100 transition-all duration-500 blur-xl"
    />

    
    <div
      className="relative bg-gradient-to-br from-[#1a1a2e] to-[#0a0a0f] p-2 rounded-xl ring-1
      ring-white/10 group-hover:ring-white/20 transition-all"
    >
      <div className="size-8 text-blue-400 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500" >
      <img
    src="/Image...webp"
    alt="ZitaCode"
    className='rounded-md'
    
  />
        </div>
          </div>

    <div className="flex flex-col">
      <span className="block text-xl font-semibold bg-gradient-to-r from-blue-400 via-blue-300 to-purple-400 text-transparent bg-clip-text">
        ZitaCode
      </span>
      <span className="block text-xs text-blue-400/60 font-medium">
        Online Code Editor
      </span>
    </div>
  </Link>
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