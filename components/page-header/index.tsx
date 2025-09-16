import Link from "next/link"

import { siteConfig } from "@/lib/config"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import AppIcon from "@/components/app-icon"
import { LayoutSelector } from "@/components/layout-selector"
import { ThemeSelector } from "@/components/theme-selector"

import { Header } from "./header"
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
