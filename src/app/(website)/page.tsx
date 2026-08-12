import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckCircle, MenuIcon, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { SignInButton, SignUpButton } from '@clerk/nextjs'

export default function Home() {
  const plans = [
    {
      name: 'Free Plan',
      description: 'Perfect for getting started',
      price: '$0',
      features: [
        'Boost engagement with target responses',
        'Automate comment replies to enhance audience interaction',
        'Turn followers into customers with targeted messaging',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Smart AI Plan',
      description: 'Advanced features for power users',
      price: '$99',
      features: [
        'All features from Free Plan',
        'AI-powered response generation',
        'Advanced analytics and insights',
        'Priority customer support',
        'Custom branding options',
      ],
      cta: 'Upgrade Now',
    },
  ]
  return (
    <main>
      <section className="relative bg-gradient-to-b from-slate-900 via-blue-900 to-bg">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <div className="relative">
          <div className="container px-4 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-black" />
                </div>
                <span className="text-xl font-semibold text-white">
                  Trigly
                </span>
              </div>
              <nav className="hidden space-x-6 text-sm text-blue-200 md:block">
                <Link href="#features">Features</Link>
                <Link href="#pricing">Pricing</Link>
                <Link href="#about">About</Link>
              </nav>
              <SignInButton mode="modal">
                <Button className="bg-white text-black hover:bg-white/90 font-bold">Login</Button>
              </SignInButton>
            </div>

            <div className="mx-auto mt-16 max-w-3xl text-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Transform Your Instagram Engagement with Trigly
              </h1>

              <p className="mt-6 text-lg text-blue-200">
                Trigly revolutionizes how you connect with your audience on
                Instagram. Automate responses and boost engagement effortlessly,
                turning interactions into valuable business opportunities.
              </p>

              <div className="mt-8 flex justify-center gap-4">
                <SignUpButton mode="modal">
                  <Button size="lg" className="bg-blue-600 text-white hover:bg-blue-700">
                    Get Started
                  </Button>
                </SignUpButton>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-blue-400  hover:bg-blue-900/50"
                >
                  Learn More
                </Button>
              </div>
            </div>
            {/* <div className="relative h-64 md:h-96 w-full mt-10 rounded-xl overflow-hidden border border-white/20 shadow-2xl flex items-center justify-center bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 backdrop-blur-md">
                  <Sparkles className="w-8 h-8 text-blue-200" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-widest uppercase">Dashboard Preview</h3>
                <p className="text-blue-200/80">Connect your Instagram account to unlock audience insights.</p>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <section className="container w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Choose Your Plan
            </h2>
            <p className="max-w-[900px] text-muted-foreground">
              Select the perfect plan to boost your Instagram engagement
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 md:gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${index === 1
                  ? 'border-blue-500 shadow-blue-900/20 shadow-xl bg-gradient-to-b from-slate-900 to-slate-900/50'
                  : 'bg-card/50 backdrop-blur-sm'
                  }`}
              >
                {index === 1 && (
                  <div className="absolute top-0 right-0 rounded-bl-xl bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className={index === 1 ? 'text-blue-400' : ''}>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="text-4xl font-bold">
                    {plan.price}
                    <span className="text-lg font-normal text-muted-foreground">
                      /month
                    </span>
                  </div>
                  <ul className="space-y-2 relative z-10">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center"
                      >
                        <CheckCircle className={`mr-2 h-4 w-4 ${index === 1 ? 'text-blue-500' : 'text-primary'}`} />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <SignUpButton mode="modal">
                    <Button className={`w-full ${index === 1 ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}`}>
                      {plan.cta}
                    </Button>
                  </SignUpButton>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 