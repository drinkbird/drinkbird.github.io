---
chapter_id: 4
chapter_slug: cross-functional-negotiation
chapter_title: "Negotiating with sales, finance, product, legal"
chapter_summary: "Maps the incentives and vocabulary of sales, finance, product, and legal - reframing cross-functional 'conflicts' as differing-incentive trade-offs. Demonstrates decomposition as the productive negotiation pattern."
---

{% raw %}
## What you'll learn
- How sales, finance, product, and legal teams are actually incentivised, and what they're optimising for.
- The vocabulary each function uses and how it maps to engineering vocabulary.
- How to find positive-sum negotiations across functional lines.
- The recurring conflict patterns and how to defuse them.

## Concepts

Cross-functional negotiation is the daily work of senior engineers. Sales wants a feature *now*; engineering wants it built *right*. Finance wants spending cut; engineering wants more headcount. Product wants more roadmap; engineering wants more time. Legal wants more guardrails; engineering wants to ship.

The naive engineer-side framing is that these are *conflicts*. They mostly aren't - they're *trade-offs* between functions whose incentives are different. Understanding the incentives transforms many of these from adversarial conversations into collaborative ones.

### Sales: incentives and vocabulary

Sales reps work on *quota* - a target for how much new ARR they need to close in a period (usually a year, broken into quarters). Their compensation is heavily commission-based: typically 50% base + 50% variable, with accelerators above quota. The result: a salesperson is acutely focused on what closes deals *this quarter*.

**Sales vocabulary:**
- **ACV** - Annual Contract Value, the size of a deal annualised.
- **Pipeline** - the forecast of deals at various stages.
- **Commit / forecast** - the deals the rep is confident will close.
- **Best case / pull-in** - deals that could close with stretch effort.
- **Slipped** - a deal that won't close this quarter but might next.
- **Stalled** - a deal that's not moving.
- **Win rate** - close rate against an identifiable competitor or alternative.

**What sales is optimising for:**
- Close deals this quarter
- Maintain pipeline coverage
- Avoid blockers from any other function (engineering, product, legal)
- Maximise commission

**Where engineering and sales clash:**
- Sales wants the feature for *this specific deal*. Engineering wants to build for the broader product.
- Sales agrees to customisations. Engineering owns the maintenance forever.
- Sales overpromises timelines. Engineering misses them.

**How to negotiate productively:**
- Translate engineering capacity into deal language. "We can ship audit log in Q3; that supports the 5 RFPs in your pipeline. Adding the federation feature requested by one customer adds 6 weeks - is that one deal worth $X of delay to the other 4?"
- Use specific deal numbers when refusing custom work. "This customisation would consume 30% of our team for a quarter; it would block the SSO ship that 4 other prospects need. Net negative."
- Build sales-team allies. The most effective senior engineers have a regular 1:1 with the sales leader or top AEs.

### Finance: incentives and vocabulary

Finance teams optimise for accurate forecasting, capital efficiency, and not surprising the board. Their incentives flow from the CFO down: hit the operating plan, beat consensus, manage cash.

**Finance vocabulary:**
- **Burn rate** / **runway** - covered in [Module 1 Chapter 3](/courses/engineers-mba/01-foundations-business-os/03-cash-profit-accruals/).
- **OpEx / CapEx** - operating expense vs. capital expense (different P&L treatment).
- **FTE** - Full-Time Equivalent (1.0 FTE = one full-time employee).
- **Headcount budget** - the plan for hiring; usually quarterly.
- **Above plan / below plan** - variance to commitment.
- **Magic number, burn multiple, rule of 40** - covered in [Module 4 Chapter 1](/courses/engineers-mba/04-operating-a-software-business/01-saas-metric-tree/).

**What finance is optimising for:**
- Forecast accuracy (hitting commitments)
- Capital efficiency (cost per unit of growth)
- Cash runway (months of survival)
- Predictability

**Where engineering and finance clash:**
- Engineering wants to hire 5 senior engineers. Finance wants to know if 3 mid-level would deliver 80%.
- Engineering wants to spend $500k on cloud infrastructure. Finance wants the cost-per-customer breakdown.
- Engineering wants to commit to a multi-year platform investment. Finance wants quarterly milestones.

**How to negotiate productively:**
- Bring finance into the conversation early. They hate surprises; they love being consulted.
- Frame engineering decisions in financial terms. Headcount as capital; infrastructure as variable cost; platform investment as fixed-cost amortisation.
- Use the metric tree vocabulary. "This will improve our magic number by 0.15 over 4 quarters."
- Be specific about milestones and kill criteria. Finance will fund multi-year bets if the structure is right.

### Product: incentives and vocabulary

Product managers own the *what* and *why* of the roadmap; engineering owns the *how*. PMs are evaluated on shipping the right features that move the right business metrics. Their incentives include both internal (engineering velocity, sales enablement) and external (customer adoption, retention, revenue impact).

**Product vocabulary:**
- **PRD** - Product Requirements Document, the spec for a feature.
- **OKR / KPI** - covered in [Module 4 Chapter 2](/courses/engineers-mba/04-operating-a-software-business/02-operating-cadence/).
- **NSM** - North Star Metric, the single metric the product team optimises.
- **Adoption / activation / engagement / retention** - funnel metrics for a feature.
- **MVP / scope** - Minimum Viable Product; what's in vs. out.

**What product is optimising for:**
- Customer adoption and engagement
- Business impact (NRR, conversion, etc.)
- Shipping velocity
- Strategic narrative

**Where engineering and product clash:**
- Product wants more features. Engineering wants more time per feature.
- Product writes a PRD; engineering finds the requirements are ambiguous or contradictory.
- Product wants to ship *something*. Engineering wants to ship *the right thing*.

**How to negotiate productively:**
- Treat the PM as your partner, not your customer. Engineering and product should be one team with one set of priorities.
- When the PRD is ambiguous, push back early. "What's the success metric for this feature?" If they can't answer, the feature isn't ready.
- Bring engineering options to product decisions. "We can ship the basic version in 3 weeks or the full version in 8 weeks. Which one moves NRR more?" Lets product decide on the trade-off.
- Co-author the roadmap. Engineering input on what's possible and what builds toward the platform is critical to product's narrative.

### Legal: incentives and vocabulary

Legal teams optimise for *risk reduction*. Their job is to keep the company out of regulatory, contractual, and liability trouble. They are necessarily conservative; the cost of a mistake is asymmetric.

**Legal vocabulary:**
- **DPA** - Data Processing Agreement.
- **SOC 2 / ISO 27001** - security certifications.
- **GDPR / CCPA** - data-protection regulations.
- **Indemnification / liability cap** - contractual limits on what the company owes if it screws up.
- **Master Service Agreement (MSA)** - the standard customer contract.
- **Open-source license** - copyleft, permissive, dual-license.

**What legal is optimising for:**
- Reduce regulatory risk (GDPR, sector-specific)
- Limit contractual liability
- Protect intellectual property
- Avoid disputes

**Where engineering and legal clash:**
- Legal wants every feature reviewed for compliance. Engineering wants to ship.
- Legal wants contractual customisations limited. Sales wants flexibility.
- Legal wants every open-source license vetted. Engineering wants to use the best tool.

**How to negotiate productively:**
- Bring legal in *early*. Late-stage legal reviews kill momentum; early consultation builds shared understanding.
- Distinguish "legal must" from "legal would prefer." Some things are non-negotiable (GDPR compliance); others are preferences (additional contract terms).
- Build self-service legal resources. Approved open-source licenses, standard contract terms, pre-approved data-processing patterns reduce the friction.
- Recognise the asymmetric cost of legal mistakes. A breach can cost the company $50M; a delayed product ships next quarter.

### The pattern: incentives → vocabulary → positive-sum

The pattern across all these conversations:

1. **Understand the function's incentives.** What are they being measured on?
2. **Learn their vocabulary.** Use their words; don't make them learn engineering's.
3. **Find the positive-sum framing.** What can engineering do that *also* helps them?

A senior engineer who can do this on demand is dramatically more effective at getting their team's needs met. Engineers who can't end up in adversarial conversations that the team perpetually loses.

### The "they don't get it" framing

A common engineering complaint: "Sales doesn't understand engineering." Or: "Finance doesn't understand the platform." Or: "Legal is blocking us."

The reframe: each function is doing its job competently. Their incentives differ. Conflicts mean the trade-offs between functions are unresolved, not that the other function is incompetent.

This reframe is hard to sustain when you're frustrated. But the engineers who do sustain it have dramatically better relationships across the company, and dramatically more influence as a result.

## Walkthrough

A worked negotiation. Sales wants to commit to shipping a specific federated-identity feature to land a $1.5M deal. The deal closes in 6 weeks. Engineering estimates the feature will take 12 weeks.

**The wrong response (adversarial):**

> "We can't ship in 6 weeks. Sales is overcommitting. We need to push back."

**The collaborative response:**

> "Let me understand the deal. What specific federation does the customer need? Okta, Azure AD, generic SAML? Is it for SSO only, or do they need group-syncing too?"
>
> [Customer needs only SAML SSO with Azure AD; no group syncing for now.]
>
> "OK, basic SAML SSO with Azure AD we can ship in 4 weeks. Group syncing and the broader federation we'd need 8-10 weeks for. Can the deal close with 'SAML SSO at GA, full federation roadmap Q3'?"

The negotiation worked because:
- The full ask was decomposed into components.
- The narrow ask was achievable in the deal timeline.
- The broader ask got a roadmap commitment.
- Sales gets what they need to close; engineering ships honest scope.

The conversation pattern: don't refuse the high-level ask. *Decompose* it. Find the part that's possible; commit to it. Set expectations for the rest.

## How it fits together

```mermaid
flowchart LR
  conflict[Surface conflict] --> incentives[Understand the function's incentives]
  incentives --> vocab[Translate to their vocabulary]
  vocab --> decompose[Decompose into components]
  decompose --> positive[Find positive-sum option]
  positive --> commit[Specific commitment]
  commit --> relationship[Stronger working relationship]
```

## Common pitfalls

| Pitfall | Why it happens | Fix |
|---|---|---|
| "They don't understand" framing | Adversarial reflex | Reframe as differing incentives, not differing competence. |
| Refusing without alternatives | "Can't be done" | Decompose the ask; offer what's possible. |
| Engineering-only language | Default vocabulary | Learn each function's words; use them. |
| Late-stage involvement of legal/finance | Hoping they don't notice | Bring them in early; they'll be allies. |
| Treating PM as customer | Vendor mindset | Engineering and product are one team; act like it. |

## Exercises

1. Have a 1:1 with a leader from a non-engineering function (sales, finance, marketing, legal). Ask what they're measured on. Listen for vocabulary. Identify one place where engineering work could help their metrics.
2. For one ongoing conflict between your team and another function, list the *incentives* of the other function. Often the conflict makes sense from their angle. Then find a decomposed positive-sum option.
3. Pick a function whose vocabulary feels foreign. Spend an hour learning their key terms. Sales and finance are usually the highest-leverage for engineers.

## Recap & next

- Sales, finance, product, and legal have distinct incentives and vocabularies; learning them is a high-leverage skill.
- Most cross-functional conflicts are trade-offs, not adversarial encounters.
- Decompose high-level asks into components; offer what's possible, commit to roadmap for the rest.
- The "they don't understand" framing is usually wrong and damages relationships.

Next, the course finale: **Continued learning roadmap** - what to read, listen to, and follow after this course.
{% endraw %}
