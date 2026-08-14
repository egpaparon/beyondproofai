/**
 * Page manifest — metadata for every generated page.
 * Body HTML lives in _dev/parts/<part>.html
 */

'use strict';

module.exports = function ({ SERVICE, CRUMBS, FAQ }) {
  const HOME = { name: 'Home', href: 'index.html' };
  const WC = { name: "Workers' Compensation", href: 'workers-compensation/index.html' };
  const PI = { name: 'Personal Injury', href: 'personal-injury/index.html' };

  return [
    /* ============================ HOME ============================ */
    {
      slug: 'index.html',
      part: 'home',
      depth: 0,
      nav: null,
      noCta: true,
      title: "Flynn Law Firm | Oklahoma Workers' Compensation & Injury Lawyers | Tulsa",
      description:
        "Since 2000, Flynn Law Firm has represented Oklahoma's injured workers — and only the injured side. Workers' compensation, denied claims, car and truck wrecks, FELA. Free consultation. No fee unless we win. Bilingual team. (918) 583-0121.",
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['LegalService', 'Attorney'],
            '@id': 'https://flynnlaw.net/#firm',
            name: 'Flynn Law Firm PLLC',
            url: 'https://flynnlaw.net/',
            telephone: '+1-918-583-0121',
            faxNumber: '+1-918-583-2290',
            foundingDate: '2000',
            description:
              "Oklahoma workers' compensation and personal injury law firm representing injured workers and accident victims since 2000. Offices in Tulsa and Claremore.",
            priceRange: 'Contingency fee — no fee unless we win',
            knowsLanguage: ['en', 'es'],
            areaServed: [
              { '@type': 'State', name: 'Oklahoma' },
              { '@type': 'City', name: 'Tulsa' },
              { '@type': 'City', name: 'Claremore' },
              { '@type': 'City', name: 'Broken Arrow' },
              { '@type': 'City', name: 'Owasso' },
              { '@type': 'City', name: 'Bartlesville' },
              { '@type': 'City', name: 'Muskogee' }
            ],
            address: {
              '@type': 'PostalAddress',
              streetAddress: '1800 S Baltimore Ave, Suite 500',
              addressLocality: 'Tulsa',
              addressRegion: 'OK',
              postalCode: '74119',
              addressCountry: 'US'
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:30',
                closes: '17:00'
              }
            ]
          },
          {
            '@type': 'WebSite',
            '@id': 'https://flynnlaw.net/#website',
            url: 'https://flynnlaw.net/',
            name: 'Flynn Law Firm PLLC',
            publisher: { '@id': 'https://flynnlaw.net/#firm' },
            inLanguage: 'en-US'
          },
          FAQ([
            [
              'What does it cost to hire Flynn Law Firm?',
              'Nothing up front. We work on a contingency fee, which means our fee comes out of what we recover for you. If we do not recover anything, you owe us no attorney fee. The first consultation is free and carries no obligation.'
            ],
            [
              "Can my employer fire me for filing a workers' compensation claim?",
              "Oklahoma law prohibits an employer from retaliating against an employee for filing a workers' compensation claim in good faith. Retaliation is not always obvious — it often looks like sudden write-ups, a schedule change, or a demotion."
            ],
            [
              'My claim was denied. Is it over?',
              'No. A denial is a position taken by an insurance company, not a final ruling. Denied claims are one of the most common reasons people call us.'
            ],
            [
              'Do I have to use the doctor my employer chose?',
              "In Oklahoma workers' compensation cases the employer or its insurer generally directs medical care, but you are not without options — including the right to seek an independent medical examination in a disputed case."
            ],
            [
              'Do you have Spanish-speaking staff?',
              'Yes. Bilingual staffing has been part of how this firm operates for years — you can call and speak with someone in Spanish without arranging an interpreter in advance.'
            ]
          ])
        ]
      }
    },

    /* ==================== WORKERS' COMPENSATION ==================== */
    {
      slug: 'workers-compensation/index.html',
      part: 'wc-index',
      depth: 1,
      nav: 'wc',
      title: "Oklahoma Workers' Compensation Lawyers | Flynn Law Firm | Tulsa",
      description:
        "Oklahoma workers' compensation attorneys since 2000. Denied claims, disability ratings, retaliation, and treatment disputes. Free consultation, no fee unless we win. Check your deadline in 60 seconds.",
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          SERVICE(
            "Oklahoma Workers' Compensation Representation",
            "Representation of injured Oklahoma workers in workers' compensation claims, including denied claims, permanent disability ratings, treatment disputes and retaliation.",
            'https://flynnlaw.net/workers-compensation/'
          ),
          CRUMBS([
            { name: 'Home', path: '' },
            { name: "Workers' Compensation", path: 'workers-compensation/' }
          ]),
          FAQ([
            [
              'How long do I have to report a work injury in Oklahoma?',
              'Oklahoma generally requires an employee to give the employer notice of a work injury within 30 days. Separate and longer deadlines apply to filing the claim itself with the Workers’ Compensation Commission. Exceptions exist, particularly for injuries that develop over time.'
            ],
            [
              "Who chooses my doctor in an Oklahoma workers' compensation case?",
              'In Oklahoma the employer or its insurance carrier generally directs medical treatment in an accepted claim. That does not leave an injured worker without options, including seeking an independent medical examination when a claim or rating is disputed.'
            ],
            [
              "Can I be fired for filing a workers' compensation claim in Oklahoma?",
              'Oklahoma law prohibits an employer from retaliating against an employee for filing a claim in good faith. Retaliation is often indirect — sudden discipline, a schedule change, a transfer or a demotion following a report of injury.'
            ]
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, { name: "Workers' Compensation" }],
        eyebrow: "Oklahoma Workers' Compensation",
        h1: 'The claim is a process. The insurer knows it. <em>You should too.</em>',
        lead:
          "Flynn Law Firm has handled Oklahoma workers' compensation claims since 2000 — denials, disputed ratings, treatment fights, and employers who turn cold the week after an injury is reported.",
        actions: [
          { cls: 'btn btn--brass', href: 'tel:+19185830121', label: 'Call (918) 583-0121' },
          { cls: 'btn btn--ghost-inverse', href: '#evaluator', label: 'Check your deadline — 60 seconds' }
        ]
      }
    },

    {
      slug: 'workers-compensation/denied-claims.html',
      part: 'wc-denied',
      depth: 1,
      nav: 'wc',
      title: "Denied Workers' Comp Claim in Oklahoma? | Flynn Law Firm",
      description:
        "Your Oklahoma workers' compensation claim was denied. That is a position taken by an insurer, not a final ruling. What the common denial reasons actually mean and what to do next. Free consultation.",
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          SERVICE(
            "Denied Workers' Compensation Claims",
            "Representation of Oklahoma workers whose workers' compensation claims have been denied or disputed by an employer or insurance carrier.",
            'https://flynnlaw.net/workers-compensation/denied-claims.html'
          ),
          CRUMBS([
            { name: 'Home', path: '' },
            { name: "Workers' Compensation", path: 'workers-compensation/' },
            { name: 'Denied Claims', path: 'workers-compensation/denied-claims.html' }
          ]),
          FAQ([
            [
              "What are the most common reasons an Oklahoma workers' compensation claim is denied?",
              'The most common denial reasons are that the injury was not work-related, that the condition is pre-existing or degenerative, that notice was given late, that the injury was not reported to a doctor promptly, or that the employee was not acting in the course and scope of employment.'
            ],
            [
              'Can a denied claim still be paid?',
              'Yes. A denial is an insurance carrier taking a position. The Workers’ Compensation Commission decides disputed claims, and many denials are resolved once the claim is properly documented and presented.'
            ]
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, WC, { name: 'Denied Claims' }],
        eyebrow: 'Denied &amp; Disputed Claims',
        h1: 'A denial is a position. <em>Not a ruling.</em>',
        lead:
          'An insurance company decided not to pay. That is not the same as the claim being over, and it is not the same as the Workers’ Compensation Commission agreeing. Most people who call this office have a denial letter in their hand.',
        actions: [
          { cls: 'btn btn--brass', href: 'tel:+19185830121', label: 'Call (918) 583-0121' },
          { cls: 'btn btn--ghost-inverse', href: '{{P}}contact.html', label: 'Send us the letter' }
        ]
      }
    },

    {
      slug: 'workers-compensation/permanent-disability.html',
      part: 'wc-disability',
      depth: 1,
      nav: 'wc',
      title: "Permanent Disability Ratings & Settlements | Oklahoma Workers' Comp",
      description:
        'How Oklahoma permanent partial and permanent total disability ratings work, why a few percentage points changes everything, and how a disputed impairment rating is challenged. Flynn Law Firm, Tulsa.',
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          SERVICE(
            "Permanent Disability and Workers' Compensation Settlements",
            "Representation of Oklahoma workers in permanent partial disability and permanent total disability ratings, disputed impairment ratings and workers' compensation settlements.",
            'https://flynnlaw.net/workers-compensation/permanent-disability.html'
          ),
          CRUMBS([
            { name: 'Home', path: '' },
            { name: "Workers' Compensation", path: 'workers-compensation/' },
            { name: 'Permanent Disability', path: 'workers-compensation/permanent-disability.html' }
          ]),
          FAQ([
            [
              'What is a permanent partial disability rating?',
              'A permanent partial disability rating is a percentage assigned by a physician that describes the lasting impairment left by a work injury after maximum medical improvement. In Oklahoma that percentage drives the compensation payable for the permanent effects of the injury.'
            ],
            [
              'Can I challenge a disability rating I disagree with?',
              'Yes. A rating is a medical opinion, not a fixed fact. Where a rating is disputed, an injured worker may seek an independent medical examination and present competing medical evidence.'
            ]
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, WC, { name: 'Permanent Disability' }],
        eyebrow: 'Permanent Disability &amp; Settlements',
        h1: 'A number decides what your injury <em>was worth.</em>',
        lead:
          'At the end of an accepted claim a doctor assigns an impairment rating — a percentage. That percentage, more than anything else in the file, determines what you are paid. It is also the single most contested number in Oklahoma workers’ compensation.',
        actions: [
          { cls: 'btn btn--brass', href: 'tel:+19185830121', label: 'Call (918) 583-0121' },
          { cls: 'btn btn--ghost-inverse', href: '{{P}}contact.html', label: 'Have a rating reviewed' }
        ]
      }
    },

    {
      slug: 'workers-compensation/retaliation.html',
      part: 'wc-retaliation',
      depth: 1,
      nav: 'wc',
      title: "Fired for Filing a Workers' Comp Claim in Oklahoma? | Flynn Law Firm",
      description:
        "Oklahoma law prohibits retaliating against an employee for filing a workers' compensation claim in good faith. Retaliation rarely announces itself. What it looks like, what to document, and what to do.",
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          SERVICE(
            "Workers' Compensation Retaliation Claims",
            "Representation of Oklahoma employees who were terminated, demoted, disciplined or otherwise retaliated against after filing a workers' compensation claim.",
            'https://flynnlaw.net/workers-compensation/retaliation.html'
          ),
          CRUMBS([
            { name: 'Home', path: '' },
            { name: "Workers' Compensation", path: 'workers-compensation/' },
            { name: 'Retaliation', path: 'workers-compensation/retaliation.html' }
          ]),
          FAQ([
            [
              "Is it illegal to fire someone for filing a workers' compensation claim in Oklahoma?",
              'Oklahoma law prohibits an employer from discharging or otherwise discriminating against an employee for filing a workers’ compensation claim in good faith. Whether a particular termination qualifies depends on the facts and the timing.'
            ],
            [
              'What if I was not fired, but things got worse at work?',
              'Retaliation is not limited to termination. Sudden discipline, a changed schedule, a transfer, a demotion, or being pushed out of overtime can all be relevant, particularly where the change follows closely after an injury was reported.'
            ]
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, WC, { name: 'Retaliation' }],
        eyebrow: 'Retaliation',
        h1: 'It almost never <em>looks like</em> retaliation.',
        lead:
          'Nobody hands you a letter saying you are being punished for filing a claim. What happens is that the write-ups start, the schedule changes, and a supervisor develops concerns about work nobody mentioned in six years.',
        actions: [
          { cls: 'btn btn--brass', href: 'tel:+19185830121', label: 'Call (918) 583-0121' },
          { cls: 'btn btn--ghost-inverse', href: '{{P}}contact.html', label: 'Free case review' }
        ]
      }
    },

    {
      slug: 'workers-compensation/injured-worker-guide.html',
      part: 'wc-guide',
      depth: 1,
      nav: 'wc',
      title: "The Oklahoma Injured Worker's Guide | Deadlines, Forms, First Steps",
      description:
        "A plain-language guide to Oklahoma workers' compensation: reporting deadlines, the forms that matter, what to say and not say, recorded statements, medical treatment, and how the process actually runs.",
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Article',
            headline: "The Oklahoma Injured Worker's Guide",
            description:
              "A plain-language guide to the Oklahoma workers' compensation process: deadlines, forms, medical treatment, recorded statements and disputes.",
            author: { '@type': 'Organization', name: 'Flynn Law Firm PLLC' },
            publisher: { '@type': 'Organization', name: 'Flynn Law Firm PLLC' },
            inLanguage: 'en-US',
            mainEntityOfPage:
              'https://flynnlaw.net/workers-compensation/injured-worker-guide.html'
          },
          CRUMBS([
            { name: 'Home', path: '' },
            { name: "Workers' Compensation", path: 'workers-compensation/' },
            { name: "Injured Worker's Guide", path: 'workers-compensation/injured-worker-guide.html' }
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, WC, { name: "Injured Worker's Guide" }],
        eyebrow: 'The Guide',
        h1: 'What to do after you are hurt at work <em>in Oklahoma.</em>',
        lead:
          'Written for the person it happened to, not for lawyers. The deadlines that matter, the forms that exist, what to say, what not to say, and where claims quietly fall apart.',
        actions: [
          { cls: 'btn btn--brass', href: 'tel:+19185830121', label: 'Call (918) 583-0121' },
          { cls: 'btn btn--ghost-inverse', href: '#first-week', label: 'Start with the first week' }
        ]
      }
    },

    /* ======================= PERSONAL INJURY ======================= */
    {
      slug: 'personal-injury/index.html',
      part: 'pi-index',
      depth: 1,
      nav: 'pi',
      title: 'Oklahoma Personal Injury Lawyers | Flynn Law Firm | Tulsa',
      description:
        'Tulsa personal injury attorneys handling car and semi-truck collisions, uninsured and underinsured motorist claims, FELA railroad injuries, defective guardrails and premises liability. No fee unless we win.',
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          SERVICE(
            'Oklahoma Personal Injury Representation',
            'Representation of injured people in Oklahoma car and truck collisions, uninsured motorist claims, railroad injuries and premises liability matters.',
            'https://flynnlaw.net/personal-injury/'
          ),
          CRUMBS([
            { name: 'Home', path: '' },
            { name: 'Personal Injury', path: 'personal-injury/' }
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, { name: 'Personal Injury' }],
        eyebrow: 'Oklahoma Personal Injury',
        h1: 'The other side started working on your case <em>the day it happened.</em>',
        lead:
          'Adjusters, investigators and defence counsel were assigned within hours. Most injured people wait weeks before they talk to anyone. That gap is where cases are lost.',
        actions: [
          { cls: 'btn btn--brass', href: 'tel:+19185830121', label: 'Call (918) 583-0121' },
          { cls: 'btn btn--ghost-inverse', href: '{{P}}contact.html', label: 'Free case review' }
        ]
      }
    },

    {
      slug: 'personal-injury/car-accidents.html',
      part: 'pi-car',
      depth: 1,
      nav: 'pi',
      title: 'Tulsa Car Accident Lawyers | Uninsured & Underinsured Claims | Flynn Law Firm',
      description:
        'Oklahoma car accident attorneys handling collision claims, uninsured and underinsured motorist coverage, and insurance bad faith. Free consultation, no fee unless we win. (918) 583-0121.',
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          SERVICE(
            'Car Accident Representation',
            'Representation of people injured in Oklahoma motor vehicle collisions, including uninsured and underinsured motorist claims.',
            'https://flynnlaw.net/personal-injury/car-accidents.html'
          ),
          CRUMBS([
            { name: 'Home', path: '' },
            { name: 'Personal Injury', path: 'personal-injury/' },
            { name: 'Car Accidents', path: 'personal-injury/car-accidents.html' }
          ]),
          FAQ([
            [
              'What if the driver who hit me had no insurance?',
              'That is what uninsured motorist coverage on your own policy is for. Oklahoma insurers must offer it, and many people carry it without realising. A claim against your own carrier is still a claim an insurance company will evaluate, and it can be underpaid or denied like any other.'
            ],
            [
              'Should I give the other driver’s insurer a recorded statement?',
              'Not before you have spoken with a lawyer. A recorded statement is taken by a trained adjuster for the purpose of limiting what the insurer pays. You are generally under no obligation to give one to the other side’s carrier.'
            ]
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, PI, { name: 'Car Accidents' }],
        eyebrow: 'Car &amp; Vehicle Collisions',
        h1: 'The adjuster is friendly. <em>That is the job.</em>',
        lead:
          'Insurance adjusters are trained, measured and compensated on what they settle claims for. Being pleasant on the phone is part of the method, not an exception to it.',
        actions: [
          { cls: 'btn btn--brass', href: 'tel:+19185830121', label: 'Call (918) 583-0121' },
          { cls: 'btn btn--ghost-inverse', href: '{{P}}contact.html', label: 'Free case review' }
        ]
      }
    },

    {
      slug: 'personal-injury/truck-accidents.html',
      part: 'pi-truck',
      depth: 1,
      nav: 'pi',
      title: 'Oklahoma Semi-Truck Accident Lawyers | Flynn Law Firm | Tulsa',
      description:
        'Semi-truck and tractor-trailer collisions are governed by federal safety rules and defended by corporate insurers within hours. Oklahoma truck accident attorneys since 2000. No fee unless we win.',
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          SERVICE(
            'Semi-Truck Accident Representation',
            'Representation of people injured in Oklahoma commercial vehicle, semi-truck and tractor-trailer collisions.',
            'https://flynnlaw.net/personal-injury/truck-accidents.html'
          ),
          CRUMBS([
            { name: 'Home', path: '' },
            { name: 'Personal Injury', path: 'personal-injury/' },
            { name: 'Truck Accidents', path: 'personal-injury/truck-accidents.html' }
          ]),
          FAQ([
            [
              'Why are semi-truck cases different from car accident cases?',
              'Commercial carriers are subject to federal safety regulations covering driver hours, inspection, maintenance and qualification. Trucks also carry electronic data. That evidence exists, but it is held by the carrier and some of it is only retained for a limited period.'
            ]
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, PI, { name: 'Semi-Truck Accidents' }],
        eyebrow: 'Semi-Truck &amp; Commercial Vehicles',
        h1: 'The trucking company’s team was on scene <em>before the road reopened.</em>',
        lead:
          'Major carriers dispatch rapid-response investigators to serious collisions. They photograph, measure and interview while the other driver is still in an emergency room.',
        actions: [
          { cls: 'btn btn--brass', href: 'tel:+19185830121', label: 'Call (918) 583-0121' },
          { cls: 'btn btn--ghost-inverse', href: '{{P}}contact.html', label: 'Free case review' }
        ]
      }
    },

    {
      slug: 'personal-injury/fela-railroad.html',
      part: 'pi-fela',
      depth: 1,
      nav: 'pi',
      title: 'FELA Railroad Injury Lawyers Oklahoma | Flynn Law Firm | Tulsa',
      description:
        "Railroad workers are not covered by state workers' compensation — they claim under the Federal Employers' Liability Act. FELA is fault-based and covers pain and suffering. Oklahoma FELA attorneys since 2000.",
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          SERVICE(
            'FELA Railroad Injury Representation',
            "Representation of railroad workers injured on the job under the Federal Employers' Liability Act (FELA).",
            'https://flynnlaw.net/personal-injury/fela-railroad.html'
          ),
          CRUMBS([
            { name: 'Home', path: '' },
            { name: 'Personal Injury', path: 'personal-injury/' },
            { name: 'FELA &amp; Railroad', path: 'personal-injury/fela-railroad.html' }
          ]),
          FAQ([
            [
              'Are railroad workers covered by workers’ compensation?',
              "No. Railroad employees injured on the job are generally covered by the Federal Employers' Liability Act rather than state workers' compensation. FELA requires proof of railroad negligence, but unlike workers' compensation it allows recovery for pain and suffering."
            ]
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, PI, { name: 'FELA &amp; Railroad' }],
        eyebrow: "FELA — Federal Employers' Liability Act",
        h1: 'Railroad workers are in a <em>different system</em> entirely.',
        lead:
          "If you work for a railroad, workers' compensation does not apply to you. Your claim runs under FELA — a federal law that requires proving negligence, but that also allows recovery workers' compensation never will.",
        actions: [
          { cls: 'btn btn--brass', href: 'tel:+19185830121', label: 'Call (918) 583-0121' },
          { cls: 'btn btn--ghost-inverse', href: '{{P}}contact.html', label: 'Free case review' }
        ]
      }
    },

    /* ============================ FIRM ============================ */
    {
      slug: 'about.html',
      part: 'about',
      depth: 0,
      nav: 'about',
      title: 'About Flynn Law Firm | Tulsa, Oklahoma | Since 2000',
      description:
        'Flynn Law Firm PLLC was founded in 2000 by attorneys who left larger firms to practise differently. Workers’ compensation and injury law for Oklahoma’s injured — never for insurers or employers.',
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'AboutPage',
            name: 'About Flynn Law Firm PLLC',
            url: 'https://flynnlaw.net/about.html'
          },
          CRUMBS([
            { name: 'Home', path: '' },
            { name: 'About', path: 'about.html' }
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, { name: 'About the Firm' }],
        eyebrow: 'The Firm',
        h1: 'Founded in 2000 by people who had seen <em>how it goes wrong.</em>',
        lead:
          'The attorneys who started Flynn Law Firm had worked at larger firms. They left because of what they saw there — clients treated as file numbers, calls that went unreturned, and bills that grew faster than the case did.'
      }
    },

    {
      slug: 'attorneys.html',
      part: 'attorneys',
      depth: 0,
      nav: 'attorneys',
      title: 'Attorneys & Team | Flynn Law Firm | Tulsa, Oklahoma',
      description:
        "Meet the attorneys and staff of Flynn Law Firm PLLC in Tulsa — Michael D. Flynn, Pamla K. Cornett, and a bilingual team representing Oklahoma's injured workers since 2000.",
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          CRUMBS([
            { name: 'Home', path: '' },
            { name: 'Attorneys', path: 'attorneys.html' }
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, { name: 'Attorneys &amp; Team' }],
        eyebrow: 'Attorneys &amp; Team',
        h1: 'You will know <em>who is handling</em> your file.',
        lead:
          'A small firm by choice. That is the whole point of it — the person you speak with is the person working on your case, and you can reach them.'
      }
    },

    {
      slug: 'results.html',
      part: 'results',
      depth: 0,
      nav: 'results',
      title: 'Case Results & Client Reviews | Flynn Law Firm | Oklahoma',
      description:
        'Case results and client reviews for Flynn Law Firm PLLC, Oklahoma workers’ compensation and injury lawyers. Prior results do not guarantee a similar outcome in any other matter.',
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          CRUMBS([
            { name: 'Home', path: '' },
            { name: 'Results', path: 'results.html' }
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, { name: 'Results &amp; Reviews' }],
        eyebrow: 'Results &amp; Reviews',
        h1: 'What we have recovered, and <em>what clients said</em> about it.',
        lead:
          'Every case is different and every outcome depends on its own facts. These are examples, not predictions — and we would rather show you a real one than a slogan.'
      }
    },

    {
      slug: 'faq.html',
      part: 'faq',
      depth: 0,
      nav: null,
      title: "Frequently Asked Questions | Oklahoma Workers' Comp & Injury | Flynn Law Firm",
      description:
        "Straight answers about Oklahoma workers' compensation and injury claims: cost, deadlines, denied claims, medical treatment, retaliation, settlements, and what happens when you call.",
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          CRUMBS([
            { name: 'Home', path: '' },
            { name: 'FAQ', path: 'faq.html' }
          ]),
          FAQ([
            [
              'What does it cost to hire Flynn Law Firm?',
              'Nothing up front. We work on a contingency fee — our fee comes out of what we recover. If there is no recovery, there is no attorney fee. The consultation is free.'
            ],
            [
              'How long do I have to act?',
              'Oklahoma sets separate deadlines for notifying your employer and for filing a workers’ compensation claim, and different rules apply to injury lawsuits and to railroad claims under FELA. Do not guess — a two-minute call will tell you.'
            ],
            [
              'Should I give a recorded statement?',
              'Not before speaking with a lawyer. A recorded statement is taken by a trained adjuster for the purpose of limiting what the insurer pays.'
            ],
            [
              'Will my case go to trial?',
              'Most do not. Most workers’ compensation and injury matters resolve without a trial. Preparing a case as though it will be tried is what makes a fair resolution possible.'
            ],
            [
              'Do you charge for the first consultation?',
              'No. The first consultation is free, confidential and carries no obligation.'
            ],
            [
              'Do you speak Spanish?',
              'Yes. You can call and speak with someone in Spanish without arranging an interpreter in advance.'
            ]
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, { name: 'FAQ' }],
        eyebrow: 'Straight Answers',
        h1: 'Questions we get on <em>almost every call.</em>',
        lead:
          'If yours is not here, ask it directly. The consultation is free and there is no obligation attached to it.'
      }
    },

    {
      slug: 'contact.html',
      part: 'contact',
      depth: 0,
      nav: 'contact',
      noCta: true,
      title: 'Contact Flynn Law Firm | Free Consultation | Tulsa, Oklahoma',
      description:
        'Free, confidential consultation with Flynn Law Firm PLLC. Tulsa and Claremore offices. Call (918) 583-0121 or send a free case review request. Se habla español.',
      jsonld: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ContactPage',
            name: 'Contact Flynn Law Firm PLLC',
            url: 'https://flynnlaw.net/contact.html'
          },
          CRUMBS([
            { name: 'Home', path: '' },
            { name: 'Contact', path: 'contact.html' }
          ])
        ]
      },
      pageHead: {
        breadcrumb: [HOME, { name: 'Contact' }],
        eyebrow: 'Free Case Review',
        h1: 'Tell us <em>what happened.</em>',
        lead:
          'Free, confidential, and no obligation. Describe the situation and we will tell you honestly whether there is a claim worth pursuing — including when there is not.'
      }
    },

    /* =========================== UTILITY =========================== */
    {
      slug: 'thank-you.html',
      part: 'thank-you',
      depth: 0,
      nav: null,
      noindex: true,
      noCta: true,
      title: 'Thank You | Flynn Law Firm',
      description: 'Your request has been received. Flynn Law Firm will be in touch.',
      pageHead: {
        breadcrumb: [HOME, { name: 'Thank you' }],
        eyebrow: 'Received',
        h1: 'We have <em>your request.</em>',
        lead:
          'Someone from the firm will call you back. If it is urgent — a deadline, a denial letter with a date on it, or something happening at work right now — please call us directly rather than waiting.',
        actions: [{ cls: 'btn btn--brass', href: 'tel:+19185830121', label: 'Call (918) 583-0121' }]
      }
    },

    {
      slug: '404.html',
      part: '404',
      depth: 0,
      nav: null,
      noindex: true,
      noCta: true,
      title: 'Page Not Found | Flynn Law Firm',
      description: 'That page could not be found.',
      pageHead: {
        breadcrumb: [HOME, { name: 'Not found' }],
        eyebrow: 'Error 404',
        h1: 'That page <em>is not here.</em>',
        lead: 'The link may be old or mistyped. Here is where most people are trying to go.'
      }
    },

    {
      slug: 'privacy.html',
      part: 'privacy',
      depth: 0,
      nav: null,
      noCta: true,
      title: 'Privacy Policy | Flynn Law Firm',
      description: 'How Flynn Law Firm PLLC collects, uses and protects information submitted through this website.',
      pageHead: {
        breadcrumb: [HOME, { name: 'Privacy' }],
        eyebrow: 'Legal',
        h1: 'Privacy policy',
        lead: 'What this website collects, why, and what happens to it.'
      }
    },

    {
      slug: 'disclaimer.html',
      part: 'disclaimer',
      depth: 0,
      nav: null,
      noCta: true,
      title: 'Legal Disclaimer | Flynn Law Firm',
      description: 'Legal disclaimer and attorney advertising notice for Flynn Law Firm PLLC.',
      pageHead: {
        breadcrumb: [HOME, { name: 'Disclaimer' }],
        eyebrow: 'Legal',
        h1: 'Disclaimer',
        lead: 'Attorney advertising notice and terms of use for this website.'
      }
    },

    {
      slug: 'accessibility.html',
      part: 'accessibility',
      depth: 0,
      nav: null,
      noCta: true,
      title: 'Accessibility | Flynn Law Firm',
      description: 'Flynn Law Firm’s accessibility commitment and how to report a barrier on this website.',
      pageHead: {
        breadcrumb: [HOME, { name: 'Accessibility' }],
        eyebrow: 'Commitment',
        h1: 'Accessibility',
        lead: 'This site is built to be usable with a keyboard, a screen reader, and at any text size. If something here does not work for you, we want to hear about it.'
      }
    }
  ];
};
