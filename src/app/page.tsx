import Image from 'next/image'
import CsvReader from './components/CsvParser'
import XmlReader from './components/XMLParser'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col gap-12 items-center p-24 bg-slate-700">

      <div className="">
        XML Parser
      </div>

      <section className="flex flex-row gap-3">

        <CsvReader />
        <XmlReader />

      </section>
    </main>
  )
}
