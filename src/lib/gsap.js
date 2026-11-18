"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, Flip);

// iOS Safari animates its bottom toolbar on scroll, which changes the visual
// viewport. Ignore that resize so triggers never recalculate mid-gesture.
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, Flip, useGSAP };
