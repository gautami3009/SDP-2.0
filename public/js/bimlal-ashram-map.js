/**
 * Shree Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal Sanctuary
 * Ashram Layout Interactive Map Component
 * 
 * Provides an authentic, accessible campus layout map for pilgrims
 * showcasing Mandir, Goshala, Gurukul, Entrance and sanctuary facilities.
 */

(function() {
  'use strict';

  // Sanctuary Key Locations Data with Multilingual Content
  const ASHRAM_LOCATIONS = [
    {
      id: 'mandir',
      category: 'sanctum',
      gridArea: 'mandir',
      pinTop: 16,
      pinLeft: 50,
      icon: 'temple_hindu',
      badgeNum: '१',
      badgeNumEn: '1',
      colorClass: 'bg-[#792425] text-white border-[#FFD700]',
      beaconColor: 'rgba(255, 215, 0, 0.45)',
      distance: {
        mr: 'प्रवेशद्वारापासून ३५० मी. (५ मिनिटे पायी)',
        hi: 'प्रवेश द्वार से ३५० मी. (५ मिनट पैदल)',
        en: '350m from Entrance (~5 min walk on paved path)',
        gu: 'પ્રવેશદ્વારથી ૩૫૦ મી. (૫ મિનિટ પગપાળા)'
      },
      timing: {
        mr: 'सकाळी ०६:०० ते रात्री ०८:३० (दुपारी १२:०० महाआरती)',
        hi: 'प्रातः ०६:०० से रात्रि ०८:३० (दोपहर १२:०० महाआरती)',
        en: '06:00 AM to 08:30 PM (12:00 PM Maha Aarti)',
        gu: 'સવારે ૦૬:૦૦ થી રાત્રે ૦૮:૩૦ (બપોરે ૧૨:૦૦ મહાઆરતી)'
      },
      briefDesc: {
        mr: 'स्वयंभू पाषाण शिवलिंग व नागदेवता पीठ (३५० मी. पायी)',
        hi: 'स्वयंभू पाषाण शिवलिंग व नागपीठ (३५० मी. पैदल)',
        en: 'Self-manifested Shivling & Nag Sanctuary (350m)',
        gu: 'સ્વયંભૂ પાષાણ શિવલિંગ અને નાગદેવતા પીઠ (૩૫૦ મી. પગપાળા)'
      },
      name: {
        mr: 'श्री शिव अर्धनरेश्वर मुख्य गुहा मंदिर',
        hi: 'श्री शिव अर्धनारेश्वर मुख्य गुफा मंदिर',
        en: 'Shree Shiv Ardhanreshwari Cave Mandir',
        gu: 'શ્રી શિવ અર્ધનરેશ્વર મુખ્ય ગુફા મંદિર'
      },
      tagline: {
        mr: 'पाषाण गर्भगृह, स्वयंभू शिवलिंग व नागदेवता पीठ',
        hi: 'पाषाण गर्भगृह, स्वयंभू शिवलिंग व नागदेवता पीठ',
        en: 'Natural Stone Cave, Self-manifested Shivling & Nag Sanctuary',
        gu: 'પાષાણ ગર્ભગૃહ, સ્વયંભૂ શિવલિંગ અને નાગદેવતા પીઠ'
      },
      desc: {
        mr: 'सह्याद्रीच्या कुशीतील प्राचीन दंडकारण्य क्षेत्रातील मुख्य पाषाण गुहा गर्भगृह. येथे स्वयंभू शिव अर्धनरेश्वर शिवलिंग, नागदेवता, वाघोबा, श्रीराम पंचायतन व पंचमुखी हनुमानाची पावन प्रतिष्ठापना आहे. अखंड नामस्मरण व वैदिक मंत्रघोषाने भारलेले परम पावन केंद्र.',
        hi: 'सह्याद्रि की गोद में स्थित प्राचीन दंडकारण्य क्षेत्र का मुख्य पाषाण गुफा गर्भगृह। यहाँ स्वयंभू शिव अर्धनारेश्वर, नागदेवता, वाघदेव, श्रीराम पंचायतन एवं पंचमुखी हनुमान विराजमान हैं। अखंड ॐ नमः शिवाय नामघोष से युक्त परम शांत धाम।',
        en: 'The prime natural cave sanctum situated in the ancient Dandakaranya valley. Enshrines the self-manifested Shivling, sacred Nag Devata, Waghoba, and divine idols amidst continuous Vedic chanting and serene forest silence.',
        gu: 'સહ્યાદ્રિના ખોળામાં પ્રાચીન દંડકારણ્ય ક્ષેત્રમાં આવેલું મુખ્ય પાષાણ ગુફા ગર્ભગૃહ. અહીં સ્વયંભૂ શિવ અર્ધનરેશ્વર શિવલિંગ, નાગદેવતા, વાઘોબા, શ્રીરામ પંચાયતન અને પંચમુખી હનુમાન બિરાજમાન છે. અખંડ નામસ્મરણ અને વૈદિક મંત્રોચ્ચારથી ગુંજતું પરમ પવિત્ર ધામ.'
      },
      guidelines: {
        mr: ['सात्विक पोशाख अनिवार्य', 'गर्भगृहात मोबाईल छायाचित्रण निषिद्ध', 'पादत्राणे बाहेर काढून हात-पाय स्वच्छ धुवावेत', 'ज्येष्ठ नागरिकांसाठी सुलभ दर्शन रांग'],
        hi: ['सात्विक वेशभूषा अनिवार्य', 'गर्भगृह में मोबाइल फोटोग्राफी वर्जित', 'जूते-चप्पल बाहर रखें व हस्त-पाद प्रक्षालन करें', 'वरिष्ठ नागरिकों हेतु सुगम दर्शन व्यवस्था'],
        en: ['Modest traditional dress required', 'No mobile photography inside sanctum', 'Footwear deposit & cleansing area outside', 'Dedicated accessible queue for elders'],
        gu: ['સાત્વિક પોશાક ફરજિયાત', 'ગર્ભગૃહમાં મોબાઈલ ફોટોગ્રાફી નિષેધ', 'પગરખાં બહાર કાઢી હાથ-પગ સ્વચ્છ ધોવા', 'વરિષ્ઠ નાગરિકો માટે સુગમ દર્શન વ્યવસ્થા']
      },
      ctaLink: '#darshan-journey',
      ctaText: {
        mr: 'दर्शन वेळा व नियम पहा',
        hi: 'दर्शन समय व नियम देखें',
        en: 'View Darshan Timings & Rules',
        gu: 'દર્શન સમય અને નિયમો જુઓ'
      }
    },
    {
      id: 'goshala',
      category: 'seva',
      gridArea: 'goshala',
      pinTop: 46,
      pinLeft: 78,
      icon: 'cruelty_free',
      badgeNum: '२',
      badgeNumEn: '2',
      colorClass: 'bg-[#1B3B2B] text-white border-[#C5A059]',
      beaconColor: 'rgba(27, 59, 43, 0.5)',
      distance: {
        mr: 'प्रवेशद्वारापासून २५० मी. (पूर्व परिसर, ३ मिनिटे)',
        hi: 'प्रवेश द्वार से २५० मी. (पूर्वी परिसर, ३ मिनट)',
        en: '250m from Entrance (East wing, ~3 min walk)',
        gu: 'પ્રવેશદ્વારથી ૨૫૦ મી. (પૂર્વ પરિસર, ૩ મિનિટ)'
      },
      timing: {
        mr: 'सकाळी ०७:०० ते संध्याकाळी ०६:३०',
        hi: 'प्रातः ०७:०० से सायं ०६:३०',
        en: '07:00 AM to 06:30 PM',
        gu: 'સવારે ૦૭:૦૦ થી સાંજે ૦૬:૩૦'
      },
      briefDesc: {
        mr: 'देशी गीर-कांक्रेज गोमाता सेवा व शुद्ध दुग्ध (२५० मी.)',
        hi: 'देशी गीर-कांकरेज गोमाता सेवा व शुद्ध दुग्ध (२५० मी.)',
        en: 'Indigenous Cow Care & Daily Abhishekam (250m)',
        gu: 'દેશી ગીર-કાંકરેજ ગૌમાતા સેવા અને શુદ્ધ દૂધ (૨૫૦ મી.)'
      },
      name: {
        mr: 'पवित्र गोशाळा व देशी गोसंवर्धन केंद्र',
        hi: 'पवित्र गोशाला एवं देशी गोसंवर्धन केंद्र',
        en: 'Sacred Goshala & Indigenous Cow Sanctuary',
        gu: 'પવિત્ર ગૌશાળા અને દેશી ગૌસંવર્ધન કેન્દ્ર'
      },
      tagline: {
        mr: 'गीर व कांक्रेज गोमाता संवर्धन, गोग्रास व अभिषेक दुग्ध सेवा',
        hi: 'गीर एवं कांकरेज गोमाता संरक्षण, गोग्रास व अभिषेक सेवा',
        en: 'Indigenous Gir & Kankrej Cows, Daily Abhishekam & Fodder Seva',
        gu: 'ગીર અને કાંકરેજ ગૌમાતા સંવર્ધન, ગોગ્રાસ અને અભિષેક દૂધ સેવા'
      },
      desc: {
        mr: 'अभयारण्यातील नैसर्गिक हिरवळीत वसलेली पवित्र गोशाळा. येथे १०० हून अधिक देशी गीर व कांक्रेज गोमातांचे प्रेमाने संगोपन केले जाते. मंदिरातील दैनंदिन पंचामृत अभिषेक व प्रसादासाठी याच गोशाळेचे शुद्ध दुग्ध वापरले जाते. भाविक येथे स्वतःच्या हाताने गोग्रास व चारा अर्पण करू शकतात.',
        hi: 'अभयारण्य की प्राकृतिक हरियाली में स्थित पवित्र गोशाला। यहाँ १०० से अधिक देशी गीर व कांकरेज गोमाताओं की सेवा की जाती है। मंदिर में दैनिक पंचामृत अभिषेक व प्रसाद हेतु यहीं का शुद्ध दुग्ध अर्पित होता है। भक्तगण स्वयं गोग्रास व चारा सेवा कर सकते हैं।',
        en: 'Peaceful sanctuary preserving over 100 indigenous Gir and Kankrej cows beside natural pastures. Provides pure A2 milk for daily temple abhishekam. Devotees can offer fresh grass and participate in mindful Gau-seva.',
        gu: 'અભયારણ્યની પ્રાકૃતિક હરિયાળીમાં આવેલી પવિત્ર ગૌશાળા. અહીં ૧૦૦ થી વધુ દેશી ગીર અને કાંકરેજ ગૌમાતાઓની સ્નેહપૂર્વક સેવા કરવામાં આવે છે. મંદિરમાં દૈનિક પંચામૃત અભિષેક અને પ્રસાદ માટે અહીંનું શુદ્ધ દૂધ અર્પણ થાય છે. ભક્તો પોતે ગોગ્રાસ અને ઘાસચારો અર્પણ કરી શકે છે.'
      },
      guidelines: {
        mr: ['गोमातेला खाऊ घालताना शांतता राखा', 'केवळ आश्रम व्यवस्थापनाने दिलेला चाराच द्यावा', 'गोशाळेत प्लॅस्टिक पिशव्या नेणे सक्त मनाई'],
        hi: ['गोमाता के समीप शांत रहें', 'केवल आश्रम प्रबंधन द्वारा प्रदत्त चारा ही खिलाएं', 'गोशाला में प्लास्टिक ले जाना पूर्णतः वर्जित'],
        en: ['Gentle behavior around cattle', 'Feed only approved ashram fodder', 'Strictly zero plastic permitted in sheds'],
        gu: ['ગૌમાતા પાસે શાંતિ જાળવો', 'માત્ર આશ્રમ વ્યવસ્થાપન દ્વારા અપાયેલ ઘાસચારો જ ખવડાવો', 'ગૌશાળામાં પ્લાસ્ટિક લઈ જવું સખત મનાઈ']
      },
      ctaLink: '#services-section',
      ctaText: {
        mr: 'गोसेवा माहिती व सहभाग',
        hi: 'गोसेवा जानकारी व सहभागिता',
        en: 'Explore Gau-Seva Offerings',
        gu: 'ગૌસેવા માહિતી અને સહભાગ'
      }
    },
    {
      id: 'gurukul',
      category: 'seva',
      gridArea: 'gurukul',
      pinTop: 48,
      pinLeft: 22,
      icon: 'menu_book',
      badgeNum: '३',
      badgeNumEn: '3',
      colorClass: 'bg-[#8C4A15] text-white border-[#FFD700]',
      beaconColor: 'rgba(140, 74, 21, 0.45)',
      distance: {
        mr: 'प्रवेशद्वारापासून २८० मी. (पश्चिम शांत परिसर, ४ मिनिटे)',
        hi: 'प्रवेश द्वार से २८० मी. (पश्चिम शांत परिसर, ४ मिनट)',
        en: '280m from Entrance (West quiet grove, ~4 min walk)',
        gu: 'પ્રવેશદ્વારથી ૨૮૦ મી. (પશ્ચિમ શાંત પરિસર, ૪ મિનિટ)'
      },
      timing: {
        mr: 'सकाळी ०८:०० ते दुपारी १२:०० · दुपारी ०३:०० ते ०६:००',
        hi: 'प्रातः ०८:०० से दोपहर १२:०० · दोपहर ०३:०० से ०६:००',
        en: '08:00 AM - 12:00 PM · 03:00 PM - 06:00 PM',
        gu: 'સવારે ૦૮:૦૦ થી બપોરે ૧૨:૦૦ · બપોરે ૦૩:૦૦ થી ૦૬:૦૦'
      },
      briefDesc: {
        mr: 'संस्कृत वेदविद्या, निसर्ग गुरुकुल व बाल संस्कार (३०० मी.)',
        hi: 'संस्कृत वेदविद्या व बाल संस्कार वाटिका (३०० मी.)',
        en: 'Vedic Scriptures & Forest Academy (300m)',
        gu: 'સંસ્કૃત વેદવિદ્યા, પ્રકૃતિ ગુરુકુળ અને સંસ્કાર વાટિકા (૩૦૦ મી.)'
      },
      name: {
        mr: 'गुरुकुल, वेदपाठशाळा व आध्यात्मिक वाचनालय',
        hi: 'गुरुकुल, वेदपाठशाला एवं आध्यात्मिक वाचनालय',
        en: 'Gurukul, Vedic Vidyapeeth & Study Grove',
        gu: 'ગુરુકુળ, વેદપાઠશાળા અને આધ્યાત્મિક વાચનાલય'
      },
      tagline: {
        mr: 'प्राचीन वैदिक अध्ययन, संस्कृत श्लोकपठण व निसर्ग संस्कार',
        hi: 'प्राचीन वैदिक अध्ययन, संस्कृत मंत्रोच्चार एवं जीवन संस्कार',
        en: 'Vedic Chanting, Sanskrit Studies & Nature-Integrated Learning',
        gu: 'પ્રાચીન વૈદિક અધ્યયન, સંસ્કૃત શ્લોકપઠન અને જીવન સંસ્કાર'
      },
      desc: {
        mr: 'डांगच्या आदिवासी बालकांना आणि साधकांना प्राचीन भारतीय संस्कृती, संस्कृत ऋचा व पर्यावरण संवर्धनाचे धडे देणारे शांत अध्ययन संकुल. येथे दररोज संध्याकाळी विद्यार्थी सामूहिक रुद्राध्याय व शिवस्तुतीचे पठण करतात. येथे भाविकांसाठी शांत स्वाध्याय कक्ष उपलब्ध आहे.',
        hi: 'डांग के जनजाति बालकों व साधकों को सनातन संस्कृति, वेदपाठ और प्रकृति संरक्षण का निःशुल्क ज्ञान देने वाला पावन केंद्र। यहाँ नित्य सायंकाल विद्यार्थी रुद्राध्याय व शिव स्तुति का पाठ करते हैं। साधकों हेतु शांत अध्ययन कक्ष उपलब्ध है।',
        en: 'Forest academy imparting traditional Vedic wisdom, Sanskrit chanting, and ecological guardianship to local tribal youth and seekers. Features a serene reading pavilion and daily Vedic evening chanting.',
        gu: 'ડાંગના આદિવાસી બાળકો અને સાધકોને સનાતન સંસ્કૃતિ, સંસ્કૃત ઋચાઓ અને પર્યાવરણ સંરક્ષણના પાઠ શીખવતું શાંત શિક્ષણ કેન્દ્ર. અહીં દરરોજ સાંજે વિદ્યાર્થીઓ સામૂહિક રુદ્રાધ્યાય અને શિવસ્તુતિનું પઠન કરે છે. સાધકો માટે શાંત સ્વાધ્યાય ખંડ ઉપલબ્ધ છે.'
      },
      guidelines: {
        mr: ['अभ्यास सत्रादरम्यान पूर्ण मौन राखा', 'छायाचित्रणासाठी गुरुजींची पूर्वपरवानगी घ्यावी', 'विद्यार्थ्यांसाठी शैक्षणिक साहित्य दान स्वीकारले जाते'],
        hi: ['अध्ययन सत्र के दौरान पूर्ण मौन बनाए रखें', 'फोटोग्राफी हेतु आचार्यों से अनुमति लें', 'विद्यार्थियों हेतु शैक्षणिक सामग्री सहयोग का स्वागत'],
        en: ['Maintain silence during study hours', 'Photography requires prior permission', 'Educational supplies donations welcomed'],
        gu: ['અધ્યયન સત્ર દરમિયાન સંપૂર્ણ મૌન જાળવો', 'ફોટોગ્રાફી માટે ગુરુજીઓની પૂર્વ પરવાનગી લેવી', 'વિદ્યાર્થીઓ માટે શૈક્ષણિક સામગ્રી સહયોગ આવકાર્ય']
      },
      ctaLink: '#about-swamiji',
      ctaText: {
        mr: 'स्वामीजींचे कार्य व विचार वाचा',
        hi: 'स्वामीजी का कार्य व विचार पढ़ें',
        en: 'Learn About Swamiji’s Vision',
        gu: 'સ્વામીજીના કાર્ય અને વિચારો વાંચો'
      }
    },
    {
      id: 'entrance',
      category: 'entry',
      gridArea: 'entrance',
      pinTop: 84,
      pinLeft: 50,
      icon: 'door_sliding',
      badgeNum: '४',
      badgeNumEn: '4',
      colorClass: 'bg-[#1C1917] text-[#FFD700] border-[#C5A059]',
      beaconColor: 'rgba(197, 160, 89, 0.55)',
      distance: {
        mr: 'धामाची अधिकृत सुरुवात (आहवा-बिलमाळ रस्ता)',
        hi: 'धाम की आधिकारिक शुरुआत (आहवा-बिलमाल मार्ग)',
        en: 'Official Sanctuary Entry Point (Ahwa-Bimlal Road)',
        gu: 'ધામનું અધિકૃત પ્રવેશદ્વાર (આહવા-બિલમાળ માર્ગ)'
      },
      timing: {
        mr: 'प्रवेश द्वार २४ तास खुले · स्वागत कक्ष: ०५:३० ते २१:००',
        hi: 'प्रवेश द्वार २४ घंटे खुला · स्वागत केंद्र: ०५:३० से २१:००',
        en: 'Main Gates 24/7 · Helpdesk & Checkpoint: 05:30 AM - 09:00 PM',
        gu: 'પ્રવેશદ્વાર ૨૪ કલાક ખુલ્લું · સ્વાગત કેન્દ્ર: ૦૫:૩૦ થી ૨૧:૦૦'
      },
      briefDesc: {
        mr: 'माहिती कक्ष, ई-पास तपासणी व व्हीलचेअर सहाय्य (० मी.)',
        hi: 'सूचना केंद्र, ई-पास जाँच व व्हीलचेयर सहायता (० मी.)',
        en: 'Information, E-Pass & Wheelchair Support (0m)',
        gu: 'માહિતી કેન્દ્ર, ઈ-પાસ તપાસ અને વ્હીલચેર સહાય (૦ મી.)'
      },
      name: {
        mr: 'मुख्य प्रवेशद्वार, सुरक्षा व स्वागत कक्ष',
        hi: 'मुख्य प्रवेश द्वार, सुरक्षा एवं स्वागत कक्ष',
        en: 'Main Sanctuary Entrance & Welcome Desk',
        gu: 'મુખ્ય પ્રવેશદ્વાર, સુરક્ષા અને સ્વાગત કેન્દ્ર'
      },
      tagline: {
        mr: 'ई-पास पडताळणी, वाहनतळ, पादत्राण कक्ष व सहाय्यता केंद्र',
        hi: 'ई-पास सत्यापन, वाहन स्थल, जूता-चप्पल स्टैंड व सूचना केंद्र',
        en: 'E-Pass Checkpoint, Parking, Footwear Deposit & Helpdesk',
        gu: 'ઈ-પાસ ચકાસણી, પાર્કિંગ, પગરખાં સ્ટેન્ડ અને સહાયતા કેન્દ્ર'
      },
      desc: {
        mr: 'आहवा आणि सापुतारा मार्गावरून बिलमाळ धामात प्रवेश करण्याचे अधिकृत महाद्वार. येथे सुरक्षित वाहनतळ, ई-पास स्कॅनिंग, मोफत पादत्राण ठेवण्याची व्यवस्था, पिण्याच्या पाण्याची सोय आणि ज्येष्ठ भाविकांसाठी मोफत व्हीलचेअर सहाय्यक उपलब्ध आहेत.',
        hi: 'आहवा व सापुतारा मार्ग से बिलमाल धाम में प्रवेश का मुख्य द्वार। यहाँ व्यवस्थित वाहन पार्किंग, ई-पास जांच, निःशुल्क जूता-चप्पल जमा केंद्र, शीतल पेयजल और बुजुर्गों हेतु व्हीलचेयर सुविधा उपलब्ध है।',
        en: 'The grand welcoming portal on the Ahwa-Bimlal forest corridor. Features organized vehicle parking, E-pass desk, free footwear storage, mountain spring drinking water, and wheelchair assistance for seniors.',
        gu: 'આહવા અને સાપુતારા માર્ગ પરથી બિલમાળ ધામમાં પ્રવેશવાનું અધિકૃત મહાદ્વાર. અહીં સુરક્ષિત વાહન પાર્કિંગ, ઈ-પાસ સ્કેનિંગ, મફત પગરખાં જમા કેન્દ્ર, પીવાનું શુદ્ધ પાણી અને વરિષ્ઠ ભક્તો માટે વ્હીલચેર સહાયક ઉપલબ્ધ છે.'
      },
      guidelines: {
        mr: ['वाहन केवळ नियुक्त वाहनतळावरच उभे करावे', 'प्लॅस्टिक पिशव्या प्रवेशद्वारावर जमा कराव्यात', 'दर्शन ई-पास किंवा ओळखपत्र सोबत ठेवा'],
        hi: ['वाहन केवल निर्धारित स्थल पर ही पार्क करें', 'प्लास्टिक कचरा अंदर न ले जाएं', 'दर्शन ई-पास या परिचय पत्र साथ रखें'],
        en: ['Park vehicles only in designated lot', 'Single-use plastic banned past this point', 'Keep digital E-Pass or ID handy'],
        gu: ['વાહન માત્ર નિયુક્ત પાર્કિંગમાં જ મૂકવું', 'પ્લાસ્ટિક કચરો અંદર ન લઈ જવો', 'દર્શન ઈ-પાસ અથવા ઓળખપત્ર સાથે રાખવું']
      },
      ctaLink: '#booking-section',
      ctaText: {
        mr: 'दर्शन ई-पास नोंदणी करा',
        hi: 'दर्शन ई-पास पंजीकरण करें',
        en: 'Book Free Darshan E-Pass',
        gu: 'દર્શન ઈ-પાસ નોંધણી કરો'
      }
    },
    {
      id: 'annachhatra',
      category: 'seva',
      gridArea: 'annachhatra',
      pinTop: 66,
      pinLeft: 68,
      icon: 'restaurant',
      badgeNum: '५',
      badgeNumEn: '5',
      colorClass: 'bg-[#B45309] text-white border-[#FFD700]',
      beaconColor: 'rgba(180, 83, 9, 0.45)',
      distance: {
        mr: 'प्रवेशद्वारापासून २२० मी. (३ मिनिटे पायी)',
        hi: 'प्रवेश द्वार से २२० मी. (३ मिनट पैदल)',
        en: '220m from Entrance (~3 min walk)',
        gu: 'પ્રવેશદ્વારથી ૨૨૦ મી. (૩ મિનિટ પગપાળા)'
      },
      timing: {
        mr: 'दुपारी १२:०० ते ०३:०० (महाप्रसाद भोजन)',
        hi: 'दोपहर १२:०० से ०३:०० (महाप्रसाद भोजन)',
        en: '12:00 PM to 03:00 PM (Daily Mahaprasad)',
        gu: 'બપોરે ૧૨:૦૦ થી ૦૩:૦૦ (મહાપ્રસાદ ભોજન)'
      },
      briefDesc: {
        mr: 'दुपारी १२ ते ३ विनामूल्य शुद्ध सात्विक महाप्रसाद (२२० मी.)',
        hi: 'दोपहर १२ से ३ निःशुल्क शुद्ध महाप्रसाद (२२० मी.)',
        en: 'Daily Pure Satvik Mahaprasad 12–3 PM (220m)',
        gu: 'બપોરે ૧૨ થી ૩ નિઃશુલ્ક શુદ્ધ સાત્વિક મહાપ્રસાદ (૨૨૦ મી.)'
      },
      name: {
        mr: 'अन्नछत्र व महाप्रसाद मंडप',
        hi: 'अन्नक्षेत्र एवं महाप्रसाद मंडप',
        en: 'Annachhatra & Holy Mahaprasad Hall',
        gu: 'અન્નક્ષેત્ર અને મહાપ્રસાદ મંડપ'
      },
      tagline: {
        mr: 'सर्व भाविकांसाठी विनामूल्य शुद्ध सात्विक महाप्रसाद',
        hi: 'सभी भक्तों हेतु निःशुल्क शुद्ध सात्विक महाप्रसाद',
        en: 'Complimentary Pure Satvik Meals for All Pilgrims',
        gu: 'સર્વ ભક્તો માટે નિઃશુલ્ક શુદ્ધ સાત્વિક મહાપ્રસાદ'
      },
      desc: {
        mr: 'स्वामीजींच्या कृपेने अखंड चालणारे अन्नदान सेवा केंद्र. दररोज दुपारी आरतीनंतर येणाऱ्या प्रत्येक भाविकाला डाळी-भात, पोळी, भाजी व सात्विक गोड प्रसादाचे आदराने वाढप केले जाते. येथे अन्न वाया न घालण्याचा पवित्र नियम पाळला जातो.',
        hi: 'स्वामीजी के आशीर्वाद से अनवरत संचालित पावन अन्नदान केंद्र। प्रतिदिन महाआरती के उपरांत सभी श्रद्धालुओं को प्रेमपूर्वक शुद्ध सात्विक भोजन कराया जाता है। भोजन का एक भी कण व्यर्थ न करने का पावन आग्रह है।',
        en: 'Sacred dining sanctuary serving fresh, wholesome satvik meals to every visiting pilgrim following the midday aarti. Built on the spiritual tenet of food as divine offering.',
        gu: 'સ્વામીજીના આશીર્વાદથી અવિરત ચાલતું પવિત્ર અન્નદાન કેન્દ્ર. દરરોજ બપોરે આરતી પછી આવતા તમામ ભક્તોને પ્રેમપૂર્વક શુદ્ધ સાત્વિક ભોજન પીરસવામાં આવે છે. ભોજનનો એક પણ દાણો વ્યર્થ ન કરવાનો પવિત્ર નિયમ પાળવામાં આવે છે.'
      },
      guidelines: {
        mr: ['प्रसाद ताटात अन्न अजिबात वाया घालवू नये', 'रांगेत शिस्तीने बसावे', 'भोजनापूर्वी व नंतर हात धुण्याची उत्तम सोय'],
        hi: ['थाली में भोजन कतई व्यर्थ न छोड़ें', 'पंक्तिबद्ध बैठकर प्रसाद ग्रहण करें', 'प्रसाद पूर्व व उपरांत हस्त प्रक्षालन करें'],
        en: ['Zero food wastage strictly observed', 'Sit in organized rows for traditional service', 'Handwashing facilities available on-site'],
        gu: ['થાલીમાં ભોજન જરાય વ્યર્થ ન છોડવું', 'પંક્તિમાં શિસ્તબદ્ધ બેસવું', 'ભોજન પહેલાં અને પછી હાથ ધોવાની ઉત્તમ વ્યવસ્થા']
      },
      ctaLink: '#services-section',
      ctaText: {
        mr: 'अन्नदान सेवा सहभाग',
        hi: 'अन्नदान सेवा में सहभागिता',
        en: 'Offer Annadaan Seva',
        gu: 'અન્નદાન સેવા સહભાગ'
      }
    },
    {
      id: 'tapovan',
      category: 'sanctum',
      gridArea: 'tapovan',
      pinTop: 22,
      pinLeft: 22,
      icon: 'self_improvement',
      badgeNum: '६',
      badgeNumEn: '6',
      colorClass: 'bg-[#431407] text-[#FFD700] border-[#C5A059]',
      beaconColor: 'rgba(67, 20, 7, 0.45)',
      distance: {
        mr: 'प्रवेशद्वारापासून ४५० मी. (पर्वत पायथ्याची वाट, ७ मिनिटे)',
        hi: 'प्रवेश द्वार से ४५० मी. (पहाड़ी तलहटी, ७ मिनट)',
        en: '450m from Entrance (Forest ridge path, ~7 min walk)',
        gu: 'પ્રવેશદ્વારથી ૪૫૦ મી. (ટેકરી તળેટી માર્ગ, ૭ મિનિટ)'
      },
      timing: {
        mr: 'सकाळी ०६:३० ते संध्याकाळी ०५:३० (संध्याकाळनंतर प्रवेश बंद)',
        hi: 'प्रातः ०६:३० से सायं ०५:३० (संध्या उपरांत प्रवेश बंद)',
        en: '06:30 AM to 05:30 PM (Closes before dusk for wildlife safety)',
        gu: 'સવારે ૦૬:૩૦ થી સાંજે ૦૫:૩૦ (સાંજ પછી વન્યજીવ સુરક્ષા માટે પ્રવેશ બંધ)'
      },
      briefDesc: {
        mr: 'स्वामीजींची ४० वर्षांची मौन ध्यानभूमी व औषधी वन (४५० मी.)',
        hi: 'स्वामीजी की ४० वर्ष मौन तपोभूमि व औषधीय वन (४५० मी.)',
        en: '40-Year Silent Sadhana & Herbal Grove (450m)',
        gu: 'સ્વામીજીની ૪૦ વર્ષની મૌન તપોભૂમિ અને ઔષધીય વન (૪૫૦ મી.)'
      },
      name: {
        mr: 'तुलसीगड तपोवन, स्वामीजी ध्यान कुटी व परिक्रमा मार्ग',
        hi: 'तुलसीगढ़ तपोवन, स्वामीजी ध्यान कुटी व परिक्रमा मार्ग',
        en: 'Tulsigad Tapovan & Swamiji Meditation Grove',
        gu: 'તુલસીગઢ તપોવન, સ્વામીજી ધ્યાન કુટી અને પરિક્રમા માર્ગ'
      },
      tagline: {
        mr: '४० वर्षांची मौन तपोभूमी, औषधी वनस्पती उद्यान व शांत परिक्रमा',
        hi: '४० वर्षों की मौन तपोभूमि, औषधीय वाटिका एवं शांत परिक्रमा',
        en: '40-Year Silent Penance Grove, Herbal Sanctuary & Forest Trail',
        gu: '૪૦ વર્ષની મૌન તપોભૂમિ, ઔષધીય વનસ્પતિ ઉદ્યાન અને શાંત પરિક્રમા'
      },
      desc: {
        mr: 'पूज्य संत स्वामी अनेकरूपी महाराज यांनी चार दशके निसर्गाच्या कुशीत ज्या पाषाण शिळेवर मौन तपस्या केली ती मूळ तपोभूमी. येथे १०० हून अधिक दुर्मिळ सह्याद्री औषधी वनस्पती, पवित्र वड-पिंपळाची झाडे आणि निसर्ग ध्यानासाठी शांत आसने आहेत.',
        hi: 'परम पूज्य संत स्वामी अनेकरूपी महाराज द्वारा चार दशकों तक की गई मौन तपस्या की मूल पावन भूमि। यहाँ सह्याद्रि की दुर्लभ औषधीय वनस्पति वाटिका और गहन ध्यान हेतु शांत प्राकृतिक वातावरण है।',
        en: 'The venerable woodland spot where Param Pujya Swami Anekarupiji Maharaj performed silent sadhana for four decades. Preserves ancient native flora, medicinal herbs, and deeply meditative tree canopies.',
        gu: 'પરમ પૂજ્ય સંત સ્વામી અનેકરૂપી મહારાજે ચાર દાયકા સુધી પ્રકૃતિના ખોળામાં જે પાષાણ શિલા પર મૌન તપસ્યા કરી હતી તે મૂળ તપોભૂમિ. અહીં ૧૦૦ થી વધુ દુર્લભ સહ્યાદ્રિ ઔષધીય વનસ્પતિઓ અને ગહન ધ્યાન માટે શાંત વાતાવરણ છે.'
      },
      guidelines: {
        mr: ['पूर्ण शांतता व मौन पाळावे', 'वनस्पती अथवा झाडांची पाने तोडू नयेत', 'संध्याकाळनंतर जंगलात जाण्यास वन्यजीव सुरक्षेमुळे बंदी'],
        hi: ['गहन शांति व मौन का पालन करें', 'पौधों व वृक्षों को क्षति न पहुँचाएँ', 'वन्यजीव सुरक्षा हेतु शाम के बाद मार्ग बंद'],
        en: ['Maintain solemn silence for meditators', 'Do not pluck herbs or damage forest vegetation', 'Trail strictly closed after dusk'],
        gu: ['સંપૂર્ણ શાંતિ અને મૌન પાળવું', 'વનસ્પતિ કે વૃક્ષોના પાન ન તોડવા', 'સાંજ પછી વન્યજીવ સુરક્ષાને કારણે માર્ગ બંધ']
      },
      ctaLink: '#about-swamiji',
      ctaText: {
        mr: 'स्वामीजींची संपूर्ण जीवनगाथा वाचा',
        hi: 'स्वामीजी की सम्पूर्ण जीवनगाथा पढ़ें',
        en: 'Read Swamiji’s Sacred Chronicle',
        gu: 'સ્વામીજીની સંપૂર્ણ જીવનગાથા વાંચો'
      }
    }
  ];

  let activeLocationId = 'mandir';
  let activeFilter = 'all';

  function getCurrentLang() {
    return (window.BimlalI18n && window.BimlalI18n.currentLang) || 'mr';
  }

  function getLocalizedText(obj, lang) {
    if (!obj) return '';
    return obj[lang] || obj['mr'] || obj['en'] || '';
  }

  function renderDetailCard(locId) {
    const loc = ASHRAM_LOCATIONS.find(l => l.id === locId) || ASHRAM_LOCATIONS[0];
    const lang = getCurrentLang();

    const titleEl = document.getElementById('ashram-map-detail-title');
    const badgeEl = document.getElementById('ashram-map-detail-badge');
    const taglineEl = document.getElementById('ashram-map-detail-tagline');
    const descEl = document.getElementById('ashram-map-detail-desc');
    const distEl = document.getElementById('ashram-map-detail-dist');
    const timingEl = document.getElementById('ashram-map-detail-timing');
    const rulesListEl = document.getElementById('ashram-map-detail-rules');
    const ctaBtn = document.getElementById('ashram-map-detail-cta');
    const iconEl = document.getElementById('ashram-map-detail-icon');

    if (titleEl) titleEl.textContent = getLocalizedText(loc.name, lang);
    if (taglineEl) taglineEl.textContent = getLocalizedText(loc.tagline, lang);
    if (descEl) descEl.textContent = getLocalizedText(loc.desc, lang);
    if (distEl) distEl.textContent = getLocalizedText(loc.distance, lang);
    if (timingEl) timingEl.textContent = getLocalizedText(loc.timing, lang);
    if (iconEl) iconEl.textContent = loc.icon;

    if (badgeEl) {
      badgeEl.textContent = lang === 'en' 
        ? (loc.category === 'sanctum' ? 'Sanctum' : loc.category === 'seva' ? 'Seva & Learning' : 'Entrance & Helpdesk')
        : lang === 'hi'
        ? (loc.category === 'sanctum' ? 'गर्भगृह व दर्शन' : loc.category === 'seva' ? 'सेवा व अध्ययन' : 'प्रवेश व सुविधाएं')
        : lang === 'gu'
        ? (loc.category === 'sanctum' ? 'ગર્ભગૃહ અને દર્શન' : loc.category === 'seva' ? 'સેવા અને અધ્યયન' : 'પ્રવેશ અને સુવિધાઓ')
        : (loc.category === 'sanctum' ? 'गर्भगृह व दर्शन' : loc.category === 'seva' ? 'सेवा व अध्ययन' : 'प्रवेश व सुविधा');
    }

    if (rulesListEl) {
      rulesListEl.innerHTML = '';
      const rules = loc.guidelines[lang] || loc.guidelines['mr'] || [];
      rules.forEach(rule => {
        const li = document.createElement('li');
        li.className = 'flex items-start gap-2 text-xs text-[#57534E]';
        li.innerHTML = `
          <span class="material-symbols-outlined text-[15px] text-[#C5A059] mt-0.5 shrink-0">check_circle</span>
          <span>${rule}</span>
        `;
        rulesListEl.appendChild(li);
      });
    }

    if (ctaBtn) {
      ctaBtn.href = loc.ctaLink;
      const ctaSpan = ctaBtn.querySelector('span:not(.material-symbols-outlined)');
      if (ctaSpan) {
        ctaSpan.textContent = getLocalizedText(loc.ctaText, lang);
      }
    }

    // Highlight corresponding pin on the map
    document.querySelectorAll('.ashram-map-pin').forEach(pin => {
      const isCurrent = pin.getAttribute('data-location-id') === locId;
      pin.classList.toggle('is-selected', isCurrent);
      pin.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    // Highlight companion card in bottom quick strip
    document.querySelectorAll('.ashram-quick-card').forEach(card => {
      const isCurrent = card.getAttribute('data-location-id') === locId;
      card.classList.toggle('is-selected', isCurrent);
      card.setAttribute('aria-selected', isCurrent ? 'true' : 'false');
    });
  }

  function selectLocation(locId) {
    activeLocationId = locId;
    renderDetailCard(locId);

    // Smooth scroll to detail card on mobile if user tapped a pin
    if (window.innerWidth < 640) {
      const detailSection = document.getElementById('ashram-map-detail-card');
      if (detailSection) {
        detailSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }

  function applyFilter(filterCategory) {
    activeFilter = filterCategory;

    // Update filter tab styling
    document.querySelectorAll('.ashram-filter-btn').forEach(btn => {
      const isMatch = btn.getAttribute('data-filter') === filterCategory;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });

    // Toggle map pin visibility / dimming
    document.querySelectorAll('.ashram-map-pin').forEach(pin => {
      const cat = pin.getAttribute('data-category');
      const shouldShow = (filterCategory === 'all' || cat === filterCategory);
      if (shouldShow) {
        pin.style.opacity = '1';
        pin.style.pointerEvents = 'auto';
        pin.style.transform = pin.classList.contains('is-selected') ? 'scale(1.12)' : 'scale(1)';
      } else {
        pin.style.opacity = '0.35';
        pin.style.transform = 'scale(0.85)';
      }
    });

    // Toggle quick cards
    document.querySelectorAll('.ashram-quick-card').forEach(card => {
      const cat = card.getAttribute('data-category');
      const shouldShow = (filterCategory === 'all' || cat === filterCategory);
      card.style.display = shouldShow ? 'flex' : 'none';
    });

    // If current selected location is hidden by filter, select the first visible one
    const currentLoc = ASHRAM_LOCATIONS.find(l => l.id === activeLocationId);
    if (filterCategory !== 'all' && currentLoc && currentLoc.category !== filterCategory) {
      const firstVisible = ASHRAM_LOCATIONS.find(l => l.category === filterCategory);
      if (firstVisible) {
        selectLocation(firstVisible.id);
      }
    }
  }

  function initAshramMap() {
    // Attach event listeners to map pins
    document.querySelectorAll('.ashram-map-pin').forEach(pin => {
      // Touch support: touching a pin selects it and shows active tooltip label
      pin.addEventListener('touchstart', function(e) {
        const locId = this.getAttribute('data-location-id');
        if (locId) {
          selectLocation(locId);
          this.classList.add('tooltip-active');
        }
      }, { passive: true });

      pin.addEventListener('touchend', function() {
        setTimeout(() => {
          this.classList.remove('tooltip-active');
        }, 2200);
      }, { passive: true });

      pin.addEventListener('click', function(e) {
        e.preventDefault();
        const locId = this.getAttribute('data-location-id');
        if (locId) selectLocation(locId);
      });

      pin.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const locId = this.getAttribute('data-location-id');
          if (locId) selectLocation(locId);
        }
      });
    });

    // Attach event listeners to bottom quick cards
    document.querySelectorAll('.ashram-quick-card').forEach(card => {
      card.addEventListener('click', function(e) {
        e.preventDefault();
        const locId = this.getAttribute('data-location-id');
        if (locId) selectLocation(locId);
      });
    });

    // Attach filter button listeners
    document.querySelectorAll('.ashram-filter-btn').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        const filter = this.getAttribute('data-filter') || 'all';
        applyFilter(filter);
      });
    });

    // Initial render
    renderDetailCard(activeLocationId);

    // Sync when language changes
    window.addEventListener('bimlal-language-change', function() {
      renderDetailCard(activeLocationId);
      // Also update labels, tooltips and cards
      const lang = getCurrentLang();
      ASHRAM_LOCATIONS.forEach(loc => {
        const pinLabel = document.querySelector(`.ashram-map-pin[data-location-id="${loc.id}"] .pin-label-text`);
        if (pinLabel) {
          pinLabel.textContent = getLocalizedText(loc.name, lang);
        }
        const tooltipTitle = document.querySelector(`.ashram-map-pin[data-location-id="${loc.id}"] .ashram-pin-tooltip-title`);
        if (tooltipTitle) {
          tooltipTitle.textContent = getLocalizedText(loc.name, lang);
        }
        const tooltipDesc = document.querySelector(`.ashram-map-pin[data-location-id="${loc.id}"] .ashram-pin-tooltip-desc`);
        if (tooltipDesc) {
          tooltipDesc.textContent = getLocalizedText(loc.briefDesc || loc.tagline, lang);
        }
        const cardTitle = document.querySelector(`.ashram-quick-card[data-location-id="${loc.id}"] .quick-card-title`);
        if (cardTitle) {
          cardTitle.textContent = getLocalizedText(loc.name, lang);
        }
      });
    });
  }

  // Auto-init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAshramMap);
  } else {
    initAshramMap();
  }

  window.BimlalAshramMap = {
    init: initAshramMap,
    selectLocation: selectLocation,
    applyFilter: applyFilter,
    locations: ASHRAM_LOCATIONS
  };
})();
