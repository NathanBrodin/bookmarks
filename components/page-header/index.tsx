import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import AppIcon from "@/components/app-icon"
import { CommandMenu } from "@/components/command-menu"
import { LayoutSelector } from "@/components/layout-selector"
import { ThemeSelector } from "@/components/theme-selector"

import { Header } from "./header"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { Toolbar } from "./toolbar"

export function PageHeader() {
  return (
    <Header>
      <Button asChild variant="ghost" size="icon" className="flex size-8">
        <Link href="/" className="[&_svg]:text-primary">
          <AppIcon className="size-5" />
        </Link>
      </Button>
      <Toolbar>
        <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
          <CommandMenu navItems={siteConfig.navItems} />
        </div>
        <Separator orientation="vertical" className="3xl:flex hidden" />
        <LayoutSelector className="3xl:flex hidden" />
        <Separator orientation="vertical" />
        <ThemeSelector variant="small" />
      </Toolbar>
      <MobileNav
        items={siteConfig.navItems}
        className="flex justify-end lg:hidden"
      />
    </Header>
  )
}
