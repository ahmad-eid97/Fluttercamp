import React from "react";
import Link from "next/link";
//= Components
import { Icon } from "@iconify/react";
import { icons } from "@/lib/icons";
//= Types
import { Locale } from "@/types";
//= Styles
import cls from "./breadcrumb.module.scss"

type Props = {
	locale: Locale;
	color?: string;
	page?: string;
	justify?: string;
	homeTranslation: string;
	linksHierarchy?: { title: string; link: string | undefined; }[];
}

const Breadcrumb = ({ locale, color, page, justify, homeTranslation, linksHierarchy }: Props) => {
	const separator = (
		<Icon icon={icons.chevronRight} className={cls.separator} aria-hidden="true" />
	);

	return (
		<nav className={`${cls.breadcrumb} ${locale === 'ar' ? cls.ar : ''}`} aria-label="breadcrumb">
			<ol style={{ justifyContent: justify }}>
				<li>
					<Link href="/" style={{ color: color }}>
						{homeTranslation}
					</Link>
				</li>
				{
					linksHierarchy ?
						linksHierarchy.map(item => (
							<li key={item.link}>
								{separator}
								{
									item.link ?
										<Link href={item.link} style={{ color: color }}>
											{item.title}
										</Link>
										:
										<span className={cls.active}>{item.title}</span>
								}
							</li>
						))
						:
						<li className={cls.active}>
							{separator}
							{page || ""}
						</li>
				}

			</ol>
		</nav>
	)
}

export default Breadcrumb