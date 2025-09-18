const getServiceTags = (industry: string) => {
  const serviceTags: Record<string, string[]> = {
    // Technology & Software
    'Custom Software Development': [
      'Custom application development',
      'Database design and optimization',
      'API development and integration',
      'Legacy system modernization',
      'Software architecture consulting',
      'Code review and optimization',
      'Technical project management'
    ],

    // Business & Finance
    Accountant: [
      'Monthly bookkeeping services',
      'Year-end financial statements',
      'Tax preparation and filing',
      'Payroll processing',
      'Financial reporting',
      'Audit preparation assistance',
      'QuickBooks setup and training'
    ],
    'Financial Advisor': [
      'Investment portfolio review',
      'Retirement planning strategy',
      'Estate planning consultation',
      'Risk assessment and insurance',
      'Financial goal planning',
      '401k rollover assistance',
      'Tax-efficient investing advice'
    ],
    'Tax Consultant': [
      'Personal tax preparation',
      'Business tax planning',
      'Tax audit representation',
      'Quarterly tax estimates',
      'Tax resolution services',
      'Multi-state tax filing',
      'Tax strategy consultation'
    ],
    Bookkeeper: [
      'Daily transaction recording',
      'Bank reconciliation services',
      'Accounts payable/receivable',
      'Monthly financial reports',
      'Expense categorization',
      'Invoice processing',
      'Financial data cleanup'
    ],
    'Investment Banker': [
      'Capital raising assistance',
      'Merger and acquisition advice',
      'Valuation services',
      'Due diligence support',
      'Financial modeling',
      'IPO preparation',
      'Strategic financial planning'
    ],
    'Insurance Agent': [
      'Business insurance review',
      'Personal insurance audit',
      'Risk assessment consultation',
      'Claims assistance',
      'Policy comparison analysis',
      'Coverage gap identification',
      'Insurance cost optimization'
    ],
    'Mortgage Broker': [
      'Home loan pre-approval',
      'Refinancing consultation',
      'Commercial property financing',
      'Investment property loans',
      'Credit improvement advice',
      'Loan comparison analysis',
      'First-time buyer guidance'
    ],
    'Business Coach': [
      'Strategic planning sessions',
      'Leadership development',
      'Team building workshops',
      'Performance improvement plans',
      'Goal setting and accountability',
      'Business process optimization',
      'Executive coaching'
    ],
    CFO: [
      'Financial strategy development',
      'Cash flow management',
      'Budget planning and forecasting',
      'Financial reporting systems',
      'Risk management consulting',
      'Investor relations support',
      'Financial compliance oversight'
    ],
    Controller: [
      'Financial reporting oversight',
      'Internal controls implementation',
      'Month-end close procedures',
      'Budget vs actual analysis',
      'Cost accounting systems',
      'Financial process improvement',
      'Compliance monitoring'
    ],
    Auditor: [
      'Internal audit services',
      'Compliance audit review',
      'Financial statement audit',
      'Process audit and review',
      'Risk assessment evaluation',
      'Control testing procedures',
      'Audit report preparation'
    ],
    'Credit Analyst': [
      'Credit risk assessment',
      'Financial statement analysis',
      'Loan application review',
      'Credit portfolio monitoring',
      'Industry risk evaluation',
      'Credit policy development',
      'Default probability modeling'
    ],
    'Financial Planner': [
      'Comprehensive financial planning',
      'Investment strategy development',
      'Education funding planning',
      'Insurance needs analysis',
      'Debt management strategies',
      'Financial goal prioritization',
      'Wealth accumulation planning'
    ],
    'Wealth Manager': [
      'High net worth portfolio management',
      'Private banking services',
      'Trust and estate planning',
      'Tax optimization strategies',
      'Alternative investment advice',
      'Family office services',
      'Philanthropic planning'
    ],

    // Legal
    Attorney: [
      'Legal consultation and advice',
      'Contract review and drafting',
      'Business formation services',
      'Legal document preparation',
      'Dispute resolution',
      'Compliance consultation',
      'Legal risk assessment'
    ],
    Lawyer: [
      'Legal representation',
      'Case consultation',
      'Legal document review',
      'Court representation',
      'Legal strategy development',
      'Settlement negotiation',
      'Legal compliance advice'
    ],
    Paralegal: [
      'Legal research assistance',
      'Document preparation',
      'Case file organization',
      'Client interview coordination',
      'Court filing assistance',
      'Legal correspondence',
      'Administrative legal support'
    ],
    'Legal Consultant': [
      'Legal strategy consulting',
      'Compliance program development',
      'Legal process improvement',
      'Regulatory guidance',
      'Legal training programs',
      'Risk mitigation planning',
      'Legal operations consulting'
    ],
    'Corporate Lawyer': [
      'Business formation and structure',
      'Corporate governance advice',
      'M&A transaction support',
      'Securities compliance',
      'Contract negotiation',
      'Employment law guidance',
      'Intellectual property protection'
    ],
    'Family Lawyer': [
      'Divorce proceedings',
      'Child custody arrangements',
      'Adoption services',
      'Prenuptial agreements',
      'Estate planning',
      'Domestic relations mediation',
      'Family court representation'
    ],
    'Criminal Defense Attorney': [
      'Criminal case defense',
      'Plea bargain negotiation',
      'Court representation',
      'Legal rights consultation',
      'Case investigation',
      'Witness preparation',
      'Appeals process'
    ],
    'Personal Injury Lawyer': [
      'Accident claim representation',
      'Insurance claim negotiation',
      'Medical malpractice cases',
      'Workers compensation claims',
      'Slip and fall cases',
      'Product liability claims',
      'Settlement negotiations'
    ],
    'Real Estate Attorney': [
      'Property transaction review',
      'Title examination',
      'Contract negotiation',
      'Closing services',
      'Property dispute resolution',
      'Zoning and land use',
      'Real estate litigation'
    ],
    'Immigration Lawyer': [
      'Visa application assistance',
      'Green card applications',
      'Citizenship proceedings',
      'Immigration appeals',
      'Family reunification',
      'Business immigration',
      'Deportation defense'
    ],
    'Tax Attorney': [
      'Tax dispute resolution',
      'IRS audit representation',
      'Tax planning strategies',
      'Business tax compliance',
      'Tax penalty abatement',
      'International tax issues',
      'Tax court litigation'
    ],
    'Patent Attorney': [
      'Patent application filing',
      'Intellectual property protection',
      'Patent search and analysis',
      'Trademark registration',
      'IP litigation support',
      'Technology licensing',
      'IP portfolio management'
    ],
    'Bankruptcy Lawyer': [
      'Bankruptcy filing assistance',
      'Debt restructuring advice',
      'Chapter 7 proceedings',
      'Chapter 11 reorganization',
      'Creditor negotiation',
      'Asset protection planning',
      'Bankruptcy alternatives'
    ],

    // Healthcare
    Doctor: [
      'Medical consultation',
      'Health screening services',
      'Preventive care programs',
      'Medical referrals',
      'Health education',
      'Chronic disease management',
      'Wellness programs'
    ],
    Physician: [
      'Primary care services',
      'Diagnostic consultations',
      'Treatment planning',
      'Health monitoring',
      'Medical advice',
      'Specialist referrals',
      'Preventive medicine'
    ],
    Surgeon: [
      'Surgical consultations',
      'Pre-operative planning',
      'Surgical procedures',
      'Post-operative care',
      'Second opinion consultations',
      'Minimally invasive procedures',
      'Surgical training'
    ],
    Dentist: [
      'Dental examinations',
      'Teeth cleaning services',
      'Cavity treatment',
      'Dental restoration',
      'Oral health consultation',
      'Cosmetic dentistry',
      'Emergency dental care'
    ],
    Orthodontist: [
      'Braces consultation',
      'Orthodontic treatment',
      'Teeth alignment services',
      'Retainer fitting',
      'Bite correction',
      'Orthodontic appliances',
      'Adult orthodontics'
    ],
    Chiropractor: [
      'Spinal adjustment',
      'Pain management',
      'Injury rehabilitation',
      'Posture correction',
      'Wellness consultations',
      'Sports injury treatment',
      'Preventive care'
    ],
    'Physical Therapist': [
      'Injury rehabilitation',
      'Pain management therapy',
      'Mobility improvement',
      'Exercise program design',
      'Post-surgery recovery',
      'Sports therapy',
      'Ergonomic assessments'
    ],
    Nurse: [
      'Patient care services',
      'Health monitoring',
      'Medical administration',
      'Health education',
      'Care coordination',
      'Medication management',
      'Home health services'
    ],
    Veterinarian: [
      'Pet health examinations',
      'Vaccination services',
      'Animal surgery',
      'Emergency pet care',
      'Dental care for pets',
      'Nutritional counseling',
      'Behavioral consultations'
    ],
    Optometrist: [
      'Eye examinations',
      'Vision correction',
      'Contact lens fitting',
      'Eye disease detection',
      'Prescription glasses',
      'Vision therapy',
      'Eye health consultations'
    ],
    Psychologist: [
      'Mental health counseling',
      'Psychological assessments',
      'Therapy sessions',
      'Behavioral interventions',
      'Stress management',
      'Family counseling',
      'Group therapy'
    ],
    Psychiatrist: [
      'Mental health diagnosis',
      'Medication management',
      'Psychiatric evaluation',
      'Treatment planning',
      'Crisis intervention',
      'Therapy services',
      'Mental health consultation'
    ],
    Pharmacist: [
      'Medication consultation',
      'Prescription review',
      'Drug interaction analysis',
      'Medication management',
      'Health screenings',
      'Immunization services',
      'Medication therapy management'
    ],
    'Medical Device Sales': [
      'Medical equipment consultation',
      'Product demonstrations',
      'Training and support',
      'Equipment maintenance',
      'Technology updates',
      'Clinical support',
      'Product education'
    ],
    'Healthcare Administrator': [
      'Healthcare operations management',
      'Policy development',
      'Quality improvement',
      'Staff coordination',
      'Regulatory compliance',
      'Process optimization',
      'Healthcare consulting'
    ],
    Nutritionist: [
      'Nutritional assessments',
      'Diet planning',
      'Weight management programs',
      'Nutrition education',
      'Meal planning',
      'Dietary consultations',
      'Wellness coaching'
    ],
    'Mental Health Counselor': [
      'Individual counseling',
      'Group therapy sessions',
      'Crisis counseling',
      'Behavioral therapy',
      'Trauma counseling',
      'Addiction counseling',
      'Family therapy'
    ],
    'Speech Therapist': [
      'Speech evaluation',
      'Communication therapy',
      'Language development',
      'Swallowing therapy',
      'Voice therapy',
      'Articulation training',
      'Cognitive communication'
    ],

    // Real Estate & Construction
    'Residential Real Estate Agent': [
      'Home buying assistance',
      'Home selling services',
      'Property valuation',
      'Market analysis',
      'Neighborhood expertise',
      'First-time buyer guidance',
      'Investment property advice'
    ],
    'Commercial Real Estate Agent': [
      'Commercial property sales',
      'Lease negotiations',
      'Investment analysis',
      'Market research',
      'Property management',
      'Development consulting',
      'Portfolio optimization'
    ],
    'Real Estate Broker': [
      'Real estate transactions',
      'Agent supervision',
      'Market expertise',
      'Investment consulting',
      'Property development',
      'Commercial leasing',
      'Real estate education'
    ],
    'Property Manager': [
      'Rental property management',
      'Tenant screening',
      'Maintenance coordination',
      'Rent collection',
      'Property inspections',
      'Lease administration',
      'Investment property consulting'
    ],
    'Real Estate Developer': [
      'Land development projects',
      'Construction planning',
      'Project financing',
      'Zoning consultation',
      'Investment opportunities',
      'Development management',
      'Site acquisition'
    ],
    'General Contractor': [
      'Construction project management',
      'Home renovations',
      'Commercial construction',
      'Project planning',
      'Subcontractor coordination',
      'Cost estimation',
      'Quality control'
    ],
    Architect: [
      'Architectural design',
      'Building planning',
      'Construction drawings',
      'Design consultation',
      'Project management',
      'Code compliance',
      'Renovation planning'
    ],
    'Interior Designer': [
      'Interior design consultation',
      'Space planning',
      'Color and material selection',
      'Furniture selection',
      'Lighting design',
      'Project coordination',
      'Design implementation'
    ],
    'Home Inspector': [
      'Property inspections',
      'Safety assessments',
      'Structural evaluations',
      'System inspections',
      'Code compliance checks',
      'Inspection reports',
      'Maintenance recommendations'
    ],
    Appraiser: [
      'Property valuations',
      'Market analysis',
      'Appraisal reports',
      'Investment analysis',
      'Insurance appraisals',
      'Estate valuations',
      'Expert testimony'
    ],
    'Construction Manager': [
      'Project oversight',
      'Schedule management',
      'Budget control',
      'Quality assurance',
      'Safety management',
      'Contractor coordination',
      'Progress reporting'
    ],
    Electrician: [
      'Electrical installations',
      'Wiring repairs',
      'Panel upgrades',
      'Safety inspections',
      'Lighting installation',
      'Electrical troubleshooting',
      'Code compliance'
    ],
    Plumber: [
      'Plumbing repairs',
      'Pipe installation',
      'Drain cleaning',
      'Water heater service',
      'Bathroom renovations',
      'Emergency plumbing',
      'Leak detection'
    ],
    'HVAC Technician': [
      'HVAC installation',
      'System maintenance',
      'Repair services',
      'Energy efficiency upgrades',
      'Duct cleaning',
      'Thermostat installation',
      'Air quality improvement'
    ],
    Roofer: [
      'Roof installation',
      'Roof repairs',
      'Roof inspections',
      'Gutter installation',
      'Storm damage repair',
      'Roof maintenance',
      'Warranty services'
    ],
    Landscaper: [
      'Landscape design',
      'Lawn maintenance',
      'Garden installation',
      'Irrigation systems',
      'Tree services',
      'Seasonal cleanup',
      'Outdoor lighting'
    ],
    'Flooring Specialist': [
      'Flooring installation',
      'Floor refinishing',
      'Carpet installation',
      'Tile work',
      'Hardwood flooring',
      'Floor repairs',
      'Flooring consultation'
    ],
    'Kitchen & Bath Designer': [
      'Kitchen remodeling',
      'Bathroom renovation',
      'Design consultation',
      'Space planning',
      'Fixture selection',
      'Project coordination',
      'Custom cabinetry'
    ],
    'Civil Engineer': [
      'Infrastructure design',
      'Site development',
      'Environmental consulting',
      'Construction oversight',
      'Structural analysis',
      'Project management',
      'Regulatory compliance'
    ],

    // Sales & Marketing
    'Sales Representative': [
      'Product demonstrations',
      'Sales training',
      'Market development',
      'Customer relationship management',
      'Territory expansion',
      'Sales strategy',
      'Lead generation'
    ],
    'Marketing Manager': [
      'Marketing strategy development',
      'Campaign planning',
      'Brand management',
      'Market research',
      'Digital marketing',
      'Content strategy',
      'Marketing analytics'
    ],
    'Brand Manager': [
      'Brand strategy development',
      'Brand positioning',
      'Marketing campaigns',
      'Brand guidelines',
      'Market research',
      'Competitive analysis',
      'Brand awareness programs'
    ],
    'Public Relations Specialist': [
      'PR strategy development',
      'Media relations',
      'Press release writing',
      'Crisis communication',
      'Event publicity',
      'Reputation management',
      'Social media PR'
    ],
    'Advertising Executive': [
      'Advertising campaigns',
      'Creative strategy',
      'Media planning',
      'Brand advertising',
      'Campaign management',
      'Client relations',
      'Market positioning'
    ],
    'Sales Manager': [
      'Sales team leadership',
      'Sales strategy development',
      'Performance management',
      'Territory planning',
      'Sales training',
      'Pipeline management',
      'Revenue optimization'
    ],
    'Account Manager': [
      'Client relationship management',
      'Account growth strategies',
      'Customer retention',
      'Service coordination',
      'Upselling opportunities',
      'Contract negotiations',
      'Customer success'
    ],
    'Business Development Manager': [
      'Partnership development',
      'Market expansion',
      'Strategic alliances',
      'Revenue growth',
      'Opportunity identification',
      'Relationship building',
      'Deal negotiations'
    ],
    'Customer Success Manager': [
      'Customer onboarding',
      'Account management',
      'Customer retention',
      'Success planning',
      'Training and support',
      'Renewal management',
      'Expansion opportunities'
    ],
    'Event Planner': [
      'Event planning and coordination',
      'Venue selection',
      'Vendor management',
      'Budget planning',
      'Timeline management',
      'Corporate events',
      'Wedding planning'
    ],
    'Content Creator': [
      'Content strategy',
      'Blog writing',
      'Social media content',
      'Video production',
      'Content marketing',
      'Brand storytelling',
      'Content optimization'
    ],
    Copywriter: [
      'Marketing copy',
      'Website content',
      'Email campaigns',
      'Ad copy',
      'Product descriptions',
      'Brand messaging',
      'Content strategy'
    ],

    // Professional Services
    'HR Consultant': [
      'HR strategy development',
      'Policy development',
      'Recruitment assistance',
      'Performance management',
      'Employee relations',
      'Compliance consulting',
      'Training programs'
    ],
    'Executive Coach': [
      'Leadership development',
      'Executive coaching',
      'Performance improvement',
      'Career development',
      'Strategic planning',
      'Team building',
      'Change management'
    ],
    'Training Specialist': [
      'Training program development',
      'Employee training',
      'Skills development',
      'Training delivery',
      'Learning assessment',
      'Curriculum design',
      'Training coordination'
    ],
    'Organizational Development': [
      'Change management',
      'Culture development',
      'Team effectiveness',
      'Process improvement',
      'Leadership development',
      'Performance optimization',
      'Strategic planning'
    ],
    'Project Manager': [
      'Project planning',
      'Timeline management',
      'Resource coordination',
      'Risk management',
      'Quality assurance',
      'Stakeholder management',
      'Project delivery'
    ],
    'Operations Manager': [
      'Operations optimization',
      'Process improvement',
      'Team management',
      'Efficiency consulting',
      'Quality management',
      'Resource planning',
      'Performance metrics'
    ],
    'Quality Assurance': [
      'Quality control systems',
      'Process auditing',
      'Compliance monitoring',
      'Quality improvement',
      'Standards development',
      'Testing procedures',
      'Quality training'
    ],
    'Process Improvement Specialist': [
      'Process analysis',
      'Workflow optimization',
      'Efficiency improvements',
      'Change implementation',
      'Performance metrics',
      'Lean consulting',
      'System optimization'
    ],

    // Creative & Media
    Photographer: [
      'Event photography',
      'Portrait sessions',
      'Product photography',
      'Real estate photography',
      'Wedding photography',
      'Commercial photography',
      'Photo editing services'
    ],
    Videographer: [
      'Video production',
      'Event videography',
      'Commercial videos',
      'Wedding videography',
      'Corporate videos',
      'Video editing',
      'Live streaming'
    ],
    'Graphic Designer': [
      'Logo design',
      'Brand identity',
      'Marketing materials',
      'Website design',
      'Print design',
      'Packaging design',
      'Digital graphics'
    ],
    Artist: [
      'Custom artwork',
      'Commissioned pieces',
      'Art consultation',
      'Creative services',
      'Art installations',
      'Design services',
      'Creative direction'
    ],
    Musician: [
      'Live performances',
      'Music lessons',
      'Recording services',
      'Music composition',
      'Event entertainment',
      'Studio services',
      'Music production'
    ],
    Writer: [
      'Content writing',
      'Copywriting',
      'Technical writing',
      'Creative writing',
      'Editing services',
      'Ghost writing',
      'Content strategy'
    ],
    Editor: [
      'Content editing',
      'Proofreading services',
      'Copy editing',
      'Manuscript editing',
      'Content review',
      'Editorial consulting',
      'Publishing support'
    ],
    Journalist: [
      'Article writing',
      'Research services',
      'Interview services',
      'Press coverage',
      'Content creation',
      'Media relations',
      'News reporting'
    ],
    'Creative Director': [
      'Creative strategy',
      'Brand development',
      'Campaign creation',
      'Team leadership',
      'Creative consulting',
      'Art direction',
      'Visual identity'
    ],
    'Brand Designer': [
      'Brand identity design',
      'Logo creation',
      'Visual branding',
      'Brand guidelines',
      'Marketing materials',
      'Brand strategy',
      'Design systems'
    ],
    'Marketing Creative': [
      'Marketing design',
      'Campaign materials',
      'Visual content',
      'Creative concepts',
      'Brand materials',
      'Digital design',
      'Print materials'
    ],
    'Content Producer': [
      'Content creation',
      'Video production',
      'Podcast production',
      'Content strategy',
      'Media production',
      'Content management',
      'Multi-media content'
    ],
    'Social Media Content Creator': [
      'Social media content',
      'Content planning',
      'Visual content creation',
      'Social media strategy',
      'Influencer content',
      'Brand content',
      'Engagement strategies'
    ],

    // Education & Training
    Teacher: [
      'Educational tutoring',
      'Curriculum development',
      'Learning assessments',
      'Educational consulting',
      'Training programs',
      'Study skills coaching',
      'Subject matter expertise'
    ],
    Professor: [
      'Academic consulting',
      'Research collaboration',
      'Educational expertise',
      'Curriculum development',
      'Training programs',
      'Academic writing',
      'Subject matter expertise'
    ],
    Principal: [
      'Educational leadership',
      'School management',
      'Educational consulting',
      'Policy development',
      'Team leadership',
      'Administrative expertise',
      'Educational strategy'
    ],
    'Education Consultant': [
      'Educational strategy',
      'Curriculum consulting',
      'Program development',
      'Assessment design',
      'Educational technology',
      'Training design',
      'Learning solutions'
    ],
    Tutor: [
      'Individual tutoring',
      'Study skills coaching',
      'Test preparation',
      'Subject tutoring',
      'Learning support',
      'Academic coaching',
      'Educational support'
    ],
    'Training Manager': [
      'Training program management',
      'Employee development',
      'Skills training',
      'Training coordination',
      'Learning management',
      'Professional development',
      'Training evaluation'
    ],
    'Corporate Trainer': [
      'Corporate training programs',
      'Skills development',
      'Professional training',
      'Workshop facilitation',
      'Training delivery',
      'Learning solutions',
      'Performance training'
    ],
    'Curriculum Developer': [
      'Curriculum design',
      'Learning materials',
      'Educational content',
      'Training materials',
      'Assessment development',
      'Instructional design',
      'Learning objectives'
    ],
    'Academic Advisor': [
      'Academic planning',
      'Career guidance',
      'Educational consulting',
      'Student support',
      'Program planning',
      'Academic coaching',
      'Educational pathways'
    ],

    // Manufacturing & Industrial
    'Manufacturing Manager': [
      'Production optimization',
      'Quality management',
      'Process improvement',
      'Team leadership',
      'Efficiency consulting',
      'Safety management',
      'Manufacturing consulting'
    ],
    'Quality Control': [
      'Quality assurance',
      'Process auditing',
      'Standards compliance',
      'Quality improvement',
      'Inspection services',
      'Quality systems',
      'Compliance consulting'
    ],
    'Supply Chain Manager': [
      'Supply chain optimization',
      'Vendor management',
      'Logistics coordination',
      'Procurement consulting',
      'Inventory management',
      'Cost optimization',
      'Supply chain strategy'
    ],
    'Logistics Coordinator': [
      'Logistics planning',
      'Shipping coordination',
      'Transportation management',
      'Inventory coordination',
      'Distribution planning',
      'Freight management',
      'Logistics consulting'
    ],
    'Operations Director': [
      'Operations strategy',
      'Process optimization',
      'Team leadership',
      'Performance management',
      'Efficiency improvements',
      'Strategic planning',
      'Operations consulting'
    ],
    'Plant Manager': [
      'Plant operations',
      'Production management',
      'Safety management',
      'Team leadership',
      'Efficiency optimization',
      'Quality management',
      'Manufacturing consulting'
    ],
    'Industrial Engineer': [
      'Process engineering',
      'Efficiency analysis',
      'System optimization',
      'Workflow design',
      'Productivity improvement',
      'Engineering consulting',
      'Process development'
    ],
    'Production Manager': [
      'Production planning',
      'Team management',
      'Quality control',
      'Schedule optimization',
      'Resource management',
      'Efficiency improvement',
      'Production consulting'
    ],
    'Warehouse Manager': [
      'Warehouse operations',
      'Inventory management',
      'Team leadership',
      'Distribution coordination',
      'Process optimization',
      'Storage solutions',
      'Logistics management'
    ],
    'Distribution Manager': [
      'Distribution strategy',
      'Logistics coordination',
      'Team management',
      'Process optimization',
      'Supply chain management',
      'Distribution planning',
      'Delivery optimization'
    ],

    // Retail & Hospitality
    'Retail Manager': [
      'Store management',
      'Sales optimization',
      'Team leadership',
      'Customer service',
      'Inventory management',
      'Retail consulting',
      'Operations management'
    ],
    'Store Owner': [
      'Business consulting',
      'Retail strategy',
      'Operations optimization',
      'Customer experience',
      'Inventory management',
      'Marketing strategies',
      'Business development'
    ],
    'Restaurant Owner': [
      'Restaurant consulting',
      'Menu development',
      'Operations management',
      'Customer service',
      'Food service expertise',
      'Business development',
      'Hospitality consulting'
    ],
    'Hotel Manager': [
      'Hospitality management',
      'Guest services',
      'Operations optimization',
      'Team leadership',
      'Customer experience',
      'Revenue management',
      'Hospitality consulting'
    ],
    'Event Coordinator': [
      'Event planning',
      'Vendor coordination',
      'Event management',
      'Timeline coordination',
      'Budget management',
      'Corporate events',
      'Special events'
    ],
    'Catering Manager': [
      'Catering services',
      'Event catering',
      'Menu planning',
      'Service coordination',
      'Food service management',
      'Event planning',
      'Hospitality services'
    ],
    'Food Service Manager': [
      'Food service operations',
      'Menu development',
      'Team management',
      'Quality control',
      'Service optimization',
      'Food safety compliance',
      'Hospitality consulting'
    ],
    'Hospitality Manager': [
      'Guest services',
      'Operations management',
      'Customer experience',
      'Team leadership',
      'Service optimization',
      'Hospitality consulting',
      'Revenue optimization'
    ],
    'Travel Agent': [
      'Travel planning',
      'Trip coordination',
      'Destination expertise',
      'Travel consulting',
      'Group travel planning',
      'Vacation planning',
      'Corporate travel'
    ],
    'Tourism Specialist': [
      'Tourism consulting',
      'Destination marketing',
      'Travel planning',
      'Tour coordination',
      'Tourism development',
      'Travel expertise',
      'Cultural consulting'
    ],

    // Transportation & Logistics
    'Trucking Company Owner': [
      'Transportation services',
      'Freight coordination',
      'Logistics consulting',
      'Shipping services',
      'Fleet management',
      'Transportation planning',
      'Delivery services'
    ],
    'Logistics Manager': [
      'Logistics coordination',
      'Supply chain management',
      'Transportation planning',
      'Distribution management',
      'Inventory coordination',
      'Shipping optimization',
      'Logistics consulting'
    ],
    'Supply Chain Consultant': [
      'Supply chain optimization',
      'Process improvement',
      'Vendor management',
      'Cost reduction',
      'Efficiency consulting',
      'Strategic planning',
      'Logistics consulting'
    ],
    'Freight Broker': [
      'Freight coordination',
      'Shipping services',
      'Transportation management',
      'Logistics coordination',
      'Carrier relations',
      'Freight optimization',
      'Shipping consulting'
    ],
    'Transportation Coordinator': [
      'Transportation planning',
      'Route optimization',
      'Shipping coordination',
      'Logistics support',
      'Schedule management',
      'Transportation consulting',
      'Delivery coordination'
    ],
    'Fleet Manager': [
      'Fleet management',
      'Vehicle coordination',
      'Maintenance planning',
      'Cost optimization',
      'Safety management',
      'Fleet consulting',
      'Transportation management'
    ],
    'Shipping Manager': [
      'Shipping coordination',
      'Logistics management',
      'Distribution planning',
      'Freight management',
      'Delivery optimization',
      'Shipping consulting',
      'Transportation services'
    ],
    'Courier Service': [
      'Delivery services',
      'Courier coordination',
      'Same-day delivery',
      'Package delivery',
      'Local delivery services',
      'Express shipping',
      'Logistics services'
    ],

    // Personal Services
    'Hair Stylist': [
      'Hair styling services',
      'Hair cutting and coloring',
      'Special event styling',
      'Hair consultations',
      'Styling for photoshoots',
      'Hair care advice',
      'Wedding hair services'
    ],
    Barber: [
      'Hair cutting services',
      'Beard trimming',
      'Styling services',
      'Grooming consultations',
      'Traditional barbering',
      'Hair care advice',
      "Men's grooming"
    ],
    'Massage Therapist': [
      'Therapeutic massage',
      'Stress relief therapy',
      'Sports massage',
      'Relaxation therapy',
      'Pain management',
      'Wellness therapy',
      'Corporate wellness'
    ],
    'Personal Trainer': ['Fitness training', 'Workout planning'],
    'Auto Mechanic': [
      'Vehicle repairs',
      'Maintenance services',
      'Diagnostic services',
      'Brake and tire service',
      'Engine repair',
      'Preventive maintenance',
      'Emergency roadside assistance'
    ],
    'Auto Dealer': [
      'Vehicle sales',
      'Trade-in services',
      'Auto financing',
      'Vehicle consultation',
      'Fleet sales',
      'Automotive advice',
      'Vehicle procurement'
    ],
    'Auto Body Repair': [
      'Collision repair',
      'Dent removal',
      'Paint services',
      'Frame repair',
      'Insurance claim assistance',
      'Restoration services',
      'Bodywork consultation'
    ],
    'Car Detailing': [
      'Vehicle detailing',
      'Interior cleaning',
      'Paint protection',
      'Ceramic coating',
      'Mobile detailing',
      'Fleet detailing',
      'Vehicle restoration'
    ],
    'Tire Shop Owner': [
      'Tire sales and installation',
      'Wheel alignment',
      'Tire repairs',
      'Fleet tire services',
      'Tire consultation',
      'Emergency tire service',
      'Tire maintenance'
    ],
    'Auto Parts Dealer': [
      'Auto parts sales',
      'Parts consultation',
      'Fleet parts supply',
      'Performance parts',
      'Parts sourcing',
      'Automotive supplies',
      'Technical support'
    ],
    'Automotive Service Manager': [
      'Service management',
      'Customer service',
      'Quality assurance',
      'Team coordination',
      'Service consulting',
      'Process optimization',
      'Automotive expertise'
    ],

    // Home Services
    Handyman: [
      'Home repairs',
      'Maintenance services',
      'Small renovations',
      'Assembly services',
      'Fixture installation',
      'General contracting',
      'Home improvement'
    ],
    Painter: [
      'Interior painting',
      'Exterior painting',
      'Color consultation',
      'Surface preparation',
      'Commercial painting',
      'Decorative finishes',
      'Paint restoration'
    ],
    'Carpet Cleaner': [
      'Carpet cleaning services',
      'Upholstery cleaning',
      'Stain removal',
      'Deep cleaning',
      'Commercial cleaning',
      'Floor care services',
      'Restoration services'
    ],
    'Window Cleaner': [
      'Window cleaning services',
      'Pressure washing',
      'Commercial window cleaning',
      'Gutter cleaning',
      'Building maintenance',
      'Exterior cleaning',
      'Regular maintenance'
    ],
    'Pest Control': [
      'Pest elimination',
      'Preventive treatments',
      'Inspection services',
      'Termite control',
      'Commercial pest control',
      'Wildlife removal',
      'Ongoing maintenance'
    ],
    'Security System Installer': [
      'Security system installation',
      'Alarm systems',
      'Camera installation',
      'Access control systems',
      'Security consulting',
      'System monitoring',
      'Maintenance services'
    ],
    'Pool Service': [
      'Pool cleaning',
      'Chemical balancing',
      'Equipment maintenance',
      'Pool repairs',
      'Seasonal services',
      'Pool installation',
      'Water quality testing'
    ],
    'Appliance Repair': [
      'Appliance repairs',
      'Maintenance services',
      'Installation services',
      'Diagnostic services',
      'Warranty repairs',
      'Emergency repairs',
      'Appliance consultation'
    ],

    // Financial Services
    'Bank Manager': [
      'Banking services',
      'Loan consultation',
      'Financial planning',
      'Business banking',
      'Investment services',
      'Credit solutions',
      'Banking expertise'
    ],
    'Loan Officer': [
      'Loan applications',
      'Credit analysis',
      'Financing options',
      'Loan consultation',
      'Pre-approval services',
      'Refinancing advice',
      'Credit counseling'
    ],
    'Credit Union Manager': [
      'Credit union services',
      'Member services',
      'Financial counseling',
      'Loan services',
      'Investment advice',
      'Financial education',
      'Community banking'
    ],
    'Investment Advisor': [
      'Investment planning',
      'Portfolio management',
      'Financial analysis',
      'Retirement planning',
      'Risk assessment',
      'Investment strategies',
      'Wealth management'
    ],
    'Estate Planning Attorney': [
      'Estate planning',
      'Will preparation',
      'Trust services',
      'Probate assistance',
      'Tax planning',
      'Asset protection',
      'Legacy planning'
    ],
    'Trust Officer': [
      'Trust administration',
      'Estate management',
      'Fiduciary services',
      'Investment oversight',
      'Trust planning',
      'Wealth preservation',
      'Family office services'
    ],
    'Retirement Planning Specialist': [
      'Retirement planning',
      '401k consulting',
      'Pension planning',
      'Social security optimization',
      'Retirement income planning',
      'Employee benefits',
      'Financial security planning'
    ],
    'Payroll Services': [
      'Payroll processing',
      'Tax compliance',
      'Employee benefits',
      'Time tracking',
      'Payroll consulting',
      'HR services',
      'Compliance management'
    ],

    // Non-Profit & Government
    'Non-Profit Director': [
      'Non-profit consulting',
      'Program development',
      'Board governance',
      'Strategic planning',
      'Community outreach',
      'Volunteer coordination',
      'Mission-driven leadership'
    ],
    'Fundraising Specialist': [
      'Fundraising campaigns',
      'Donor development',
      'Grant writing',
      'Event fundraising',
      'Capital campaigns',
      'Fundraising strategy',
      'Donor relations'
    ],
    'Grant Writer': [
      'Grant writing services',
      'Proposal development',
      'Funding research',
      'Grant management',
      'Non-profit consulting',
      'Compliance assistance',
      'Grant strategy'
    ],
    'Social Worker': [
      'Social services',
      'Case management',
      'Community outreach',
      'Crisis intervention',
      'Resource coordination',
      'Advocacy services',
      'Support services'
    ],
    'Government Official': [
      'Government services',
      'Policy development',
      'Public administration',
      'Community liaison',
      'Regulatory guidance',
      'Public service',
      'Government consulting'
    ],
    'Public Administrator': [
      'Public administration',
      'Program management',
      'Policy implementation',
      'Community services',
      'Government operations',
      'Public service delivery',
      'Administrative consulting'
    ],
    'Community Organizer': [
      'Community organizing',
      'Advocacy campaigns',
      'Volunteer coordination',
      'Event planning',
      'Outreach programs',
      'Community development',
      'Social mobilization'
    ]
  }

  return serviceTags[industry]
}

export default getServiceTags
