/**
 * Shree Shiv Ardhanreshwari Nag Jyotirling Dham, Bimlal Sanctuary
 * Sacred Devotional Gallery - Interactive Swipeable Carousel & Lightbox
 */

(function() {
  'use strict';

  // Gallery items data
  const GALLERY_ITEMS = [
    {
      id: 'sohala-01',
      category: 'mandir_sohala',
      categoryName: {
        mr: 'मंदिरातील उत्सव व सोहळे',
        hi: 'मंदिर उत्सव एवं समारोह',
        en: 'Mandir Sohala Pictures',
        gu: 'મંદિર ઉત્સવ અને મહોત્સવ'
      },
      title: {
        mr: 'भव्य शोभायात्रा व पालखी सोहळा पुष्पछत्र सानिध्य',
        hi: 'भव्य शोभायात्रा एवं पालखी समारोह पुष्पछत्र सान्निध्य',
        en: 'Grand Shobha Yatra & Sacred Procession under Flower Canopy',
        gu: 'ભવ્ય શોભાયાત્રા અને પાલખી મહોત્સવ'
      },
      desc: {
        mr: 'भाविक व सेवेकऱ्यांच्या उपस्थितीत संपन्न झालेली मंदिराची भव्य पालखी व पुष्पछत्र शोभायात्रा.',
        hi: 'श्रद्धालुओं एवं सेवादारों की उपस्थिति में संपन्न भव्य मंदिर शोभायात्रा व पुष्पछत्र पालखी।',
        en: 'Devotional procession with floral canopy, temple attendants and congregation of devotees.',
        gu: 'ભક્તો અને સેવકોની ઉપસ્થિતિમાં સંપન્ન થયેલી ભવ્ય મંદિર શોભાયાત્રા.'
      },
      image: '/images/gallery/mandir-sohala/sohala-01.jpg',
      badge: { mr: 'पालखी सोहळा', hi: 'पालखी समारोह', en: 'Shobha Yatra', gu: 'પાલખી ઉત્સવ' }
    },
    {
      id: 'sohala-02',
      category: 'mandir_sohala',
      categoryName: {
        mr: 'मंदिरातील उत्सव व सोहळे',
        hi: 'मंदिर उत्सव एवं समारोह',
        en: 'Mandir Sohala Pictures',
        gu: 'મંદિર ઉત્સવ અને મહોત્સવ'
      },
      title: {
        mr: 'प. पू. स्वामीजी महाराज दिव्य अर्धनारेश्वर रूप सिंहासन दर्शन',
        hi: 'प. पू. स्वामीजी महाराज दिव्य अर्धनारेश्वर रूप सिंहासन दर्शन',
        en: 'Pujya Swamiji Maharaj in Divine Ardhanarishwara Darshan on Altar',
        gu: 'પૂજ્ય સ્વામીજી મહારાજ દિવ્ય અર્ધનરેશ્વર દર્શન'
      },
      desc: {
        mr: 'मंदिरातील विशेष सोहळ्यादरम्यान सिंहासनस्थ स्वामीजी, पुष्पसजावट व पावन शिवलिंग दर्शन.',
        hi: 'मंदिर के विशेष समारोह के दौरान सिंहासनस्थ स्वामीजी, पुष्पसज्जा एवं पावन शिवलिंग दर्शन।',
        en: 'Pujya Swamiji seated on the ceremonial flower-adorned throne before the holy Shivling during temple celebrations.',
        gu: 'મંદિરના વિશેષ ઉત્સવ દરમિયાન સિંહાસન પર બિરાજમાન સ્વામીજી અને શિવલિંગ દર્શન.'
      },
      image: '/images/gallery/mandir-sohala/sohala-02.jpg',
      badge: { mr: 'उत्सव दर्शन', hi: 'उत्सव दर्शन', en: 'Mandir Sohala', gu: 'ઉત્સવ દર્શન' }
    },
    {
      id: 'sohala-03',
      category: 'mandir_sohala',
      categoryName: {
        mr: 'मंदिरातील उत्सव व सोहळे',
        hi: 'मंदिर उत्सव एवं समारोह',
        en: 'Mandir Sohala Pictures',
        gu: 'મંદિર ઉત્સવ અને મહોત્સવ'
      },
      title: {
        mr: 'श्री शिव अर्धनारेश्वरी नाग ज्योतिर्लिंग भव्य उत्सव मंडप व वेदी',
        hi: 'श्री शिव अर्धनारेश्वरी नाग ज्योतिर्लिंग भव्य उत्सव मंडप एवं वेदी',
        en: 'Grand Festival Stage & Sacred Temple Sanctum Altar',
        gu: 'શ્રી શિવ અર્ધનરેશ્વરી નાગ જ્યોતિર્લિંગ ઉત્સવ મંડપ'
      },
      desc: {
        mr: 'उत्सव सोहळ्यासाठी सजवलेली पावन वेदी, पुष्प कमानी आणि ज्योतिर्लिंग दर्शन स्वरूप.',
        hi: 'उत्सव समारोह हेतु सुसज्जित पावन वेदी, पुष्प मंच एवं ज्योतिर्लिंग दर्शन स्वरूप।',
        en: 'Sacred festival stage setup with flower decorations and Holy Shivling altar.',
        gu: 'ઉત્સવ મહોત્સવ માટે સુશોભિત પાવન વેદી અને જ્યોતિર્લિંગ દર્શન.'
      },
      image: '/images/gallery/mandir-sohala/sohala-03.jpg',
      badge: { mr: 'उत्सव मंडप', hi: 'उत्सव मंडप', en: 'Festival Altar', gu: 'ઉત્સવ મંડપ' }
    },
    {
      id: 'sohala-04',
      category: 'mandir_sohala',
      categoryName: {
        mr: 'मंदिरातील उत्सव व सोहळे',
        hi: 'मंदिर उत्सव एवं समारोह',
        en: 'Mandir Sohala Pictures',
        gu: 'મંદિર ઉત્સવ અને મહોત્સવ'
      },
      title: {
        mr: 'श्री शिव अर्धनारेश्वर गर्भगृह, नंदी महाराज दर्शन व स्वामीजी प्रतिमा',
        hi: 'श्री शिव अर्धनारेश्वर गर्भगृह, नंदी महाराज दर्शन एवं स्वामीजी प्रतिमा',
        en: 'Sanctum Altar, Nandi Maharaj Darshan & Swamiji Portraits',
        gu: 'શ્રી શિવ અર્ધનરેશ્વર ગર્ભગૃહ, નંદી મહારાજ દર્શન અને સ્વામીજી પ્રતિમા'
      },
      desc: {
        mr: 'मंदिर गर्भगृहातील पावन नंदी महाराज, झुंबर व पूज्य स्वामीजींच्या दिव्य प्रतिमा स्वरूप.',
        hi: 'मंदिर गर्भगृह में पावन नंदी महाराज, झूमर एवं पूज्य स्वामीजी के दिव्य चित्र स्वरूप।',
        en: 'Sanctum altar featuring sacred Nandi Maharaj, holy chandelier, floral decor, and portraits of Pujya Swamiji.',
        gu: 'મંદિર ગર્ભગૃહમાં પાવન નંદી મહારાજ અને પૂજ્ય સ્વામીજીની દિવ્ય પ્રતિમા.'
      },
      image: '/images/gallery/mandir-sohala/sohala-04.jpg',
      badge: { mr: 'गर्भगृह दर्शन', hi: 'गर्भगृह दर्शन', en: 'Sanctum Darshan', gu: 'ગર્ભગૃહ દર્શન' }
    },
    {
      id: 'sohala-05',
      category: 'mandir_sohala',
      categoryName: {
        mr: 'मंदिरातील उत्सव व सोहळे',
        hi: 'मंदिर उत्सव एवं समारोह',
        en: 'Mandir Sohala Pictures',
        gu: 'મંદિર ઉત્સવ અને મહોત્સવ'
      },
      title: {
        mr: 'कन्या पूजन व पावन आशीर्वाद विधी',
        hi: 'कन्या पूजन एवं पावन आशीर्वाद विधि',
        en: 'Kanya Pujan & Sacred Blessing Ceremony',
        gu: 'કન્યા પૂજન અને પાવન આશીર્વાદ વિધિ'
      },
      desc: {
        mr: 'मंदिर उत्सवात पूज्य स्वामीजींच्या हस्ते संपन्न झालेले पवित्र कन्या पूजन व कृपाशीर्वाद.',
        hi: 'मंदिर उत्सव में पूज्य स्वामीजी द्वारा संपन्न पावन कन्या पूजन एवं शुभाशीर्वाद।',
        en: 'Sacred Kanya Pujan ritual and blessings conducted by Pujya Swamiji during temple observances.',
        gu: 'મંદિર ઉત્સવમાં પૂજ્ય સ્વામીજી દ્વારા સંપન્ન થયેલું પવિત્ર કન્યા પૂજન.'
      },
      image: '/images/gallery/mandir-sohala/sohala-05.jpg',
      badge: { mr: 'कन्या पूजन', hi: 'कन्या पूजन', en: 'Kanya Pujan', gu: 'કન્યા પૂજન' }
    },
    {
      id: 'past-01',
      category: 'past_present',
      categoryName: {
        mr: 'मंदिर भूतकाळ व वर्तमान',
        hi: 'मंदिर अतीत एवं वर्तमान',
        en: 'Mandir Past & Present',
        gu: 'મંદિર ભૂતકાળ અને વર્તમાન'
      },
      title: {
        mr: 'पाषाण गुहा गर्भगृह व शिखर — ऐतिहासिक छायाचित्र',
        hi: 'पाषाण गुफा गर्भगृह एवं शिखर — ऐतिहासिक छायाचित्र',
        en: 'Historical Stone Sanctum & Shikhar — Archival Temple View',
        gu: 'પાષાણ ગુફા ગર્ભગૃહ અને શિખર — ઐતિહાસિક છબી'
      },
      desc: {
        mr: 'डांगच्या पावन दंडकारण्यातील स्वयंभू पाषाण गुहा गर्भगृह आणि निसर्गसिद्ध तपोभूमीचे मूळ ऐतिहासिक स्वरूप.',
        hi: 'डांग के पावन दंडकारण्य में स्वयंभू पाषाण गुफा गर्भगृह एवं प्राकृतिक तपोभूमि का मूल ऐतिहासिक स्वरूप।',
        en: 'Original archival photograph of the self-manifested stone cave sanctum and sacred penance hermitage in Dang.',
        gu: 'ડાંગના પાવન દંડકારણ્યમાં સ્વયંભૂ પાષાણ ગુફા ગર્ભગૃહ અને પ્રાકૃતિક તપોભૂમિનું મૂળ ઐતિહાસિક સ્વરૂપ.'
      },
      image: '/images/gallery/past-present/mandir-past-01.jpg',
      badge: { mr: 'भूतकाळ / जुने छायाचित्र', hi: 'अतीत / प्राचीन छायाचित्र', en: 'Past / Archive', gu: 'ભૂતકાળ / જૂનું ચિત્ર' }
    },
    {
      id: 'present-01',
      category: 'past_present',
      categoryName: {
        mr: 'मंदिर भूतकाळ व वर्तमान',
        hi: 'मंदिर अतीत एवं वर्तमान',
        en: 'Mandir Past & Present',
        gu: 'મંદિર ભૂતકાળ અને વર્તમાન'
      },
      title: {
        mr: 'वर्तमान मंदिराचे छायाचित्र — पवित्र गर्भगृह व वेदी दर्शन',
        hi: 'वर्तमान मंदिर छायाचित्र — पवित्र गर्भगृह एवं वेदी दर्शन',
        en: 'Current Temple Sanctum — Holy Altar & Nandi Maharaj Darshan',
        gu: 'વર્તમાન મંદિર છબી — પવિત્ર ગર્ભગૃહ અને વેદી દર્શન'
      },
      desc: {
        mr: 'श्री शिव अर्धनारेश्वर गर्भगृह, नंदी महाराज दर्शन, झुंबर व पूज्य स्वामीजींच्या दिव्य प्रतिमा स्वरूप.',
        hi: 'श्री शिव अर्धनारेश्वर गर्भगृह, नंदी महाराज दर्शन, झूमर एवं पूज्य स्वामीजी के दिव्य चित्र स्वरूप।',
        en: 'Sanctum altar featuring sacred Nandi Maharaj, holy chandelier, floral decor, and portraits of Pujya Swamiji.',
        gu: 'શ્રી શિવ અર્ધનરેશ્વર ગર્ભગૃહ, નંદી મહારાજ દર્શન અને સ્વામીજી પ્રતિમા.'
      },
      image: '/images/gallery/past-present/mandir-present-01.jpg',
      badge: { mr: 'वर्तमान मंदिर', hi: 'वर्तमान मंदिर', en: 'Present / Modern', gu: 'વર્તમાન મંદિર' }
    },
    {
      id: 1,
      category: 'mandir',
      categoryName: { mr: 'गुहा गर्भगृह व शिखर', hi: 'गुफा गर्भगृह व शिखर', en: 'Sanctum & Shikhar', gu: 'ગુફા ગર્ભગૃહ અને શિખર' },
      title: {
        mr: 'श्री शिव अर्धनरेश्वर नाग ज्योतिर्लिंग मंदिर व पाषाण शिखर',
        hi: 'श्री शिव अर्धनरेश्वर नाग ज्योतिर्लिंग मंदिर एवं पाषाण शिखर',
        en: 'Shree Shiv Ardhanreshwari Nag Jyotirling Temple & Sanctum Shikhar',
        gu: 'શ્રી શિવ અર્ધનરેશ્વર નાગ જ્યોતિર્લિંગ મંદિર અને પાષાણ શિખર'
      },
      desc: {
        mr: 'डांगच्या घनदाट अरण्यातील स्वयंभू पाषाण गुहा गर्भगृह आणि नैसर्गिक तपोभूमी परिक्षेत्र.',
        hi: 'डांग के घने दंडकारण्य में स्वयंभू पाषाण गुफा गर्भगृह और प्राकृतिक तपोभूमि परिक्षेत्र।',
        en: 'Self-manifested stone sanctum and natural penance sanctuary in the sacred Dang forest.',
        gu: 'ડાંગના ગાઢ દંડકારણ્યમાં સ્વયંભૂ પાષાણ ગુફા ગર્ભગૃહ અને પ્રાકૃતિક તપોભૂમિ પરિસર.'
      },
      image: '/images/banner_extracted_4.jpeg',
      badge: { mr: 'मुख्य मंदिर', hi: 'मुख्य मंदिर', en: 'Main Temple', gu: 'મુખ્ય મંદિર' }
    },
    {
      id: 2,
      category: 'swamiji',
      categoryName: { mr: 'पूज्य स्वामीजी', hi: 'पूज्य स्वामीजी', en: 'Pujya Swamiji', gu: 'પૂજ્ય સ્વામીજી' },
      title: {
        mr: 'मठाधीपती प.पू. संत स्वामी अनेकरूपीजी महाराज',
        hi: 'मठाधीपति प.पू. संत स्वामी अनेकरूपीजी महाराज',
        en: 'Mathadhipati Param Pujya Sant Swami Anekarupiji Maharaj',
        gu: 'મઠાધિપતિ પરમ પૂજ્ય સંત સ્વામી અનેકરૂપીજી મહારાજ'
      },
      desc: {
        mr: '४० वर्षांहून अधिक काळ डांगच्या दंडकारण्यात अखंड मौन तपश्चर्या करणारे सिद्ध संत.',
        hi: '४० से अधिक वर्षों तक डांग के दंडकारण्य में अखंड मौन तपस्या करने वाले सिद्ध संत।',
        en: 'Revered spiritual master who observed unbroken forest tapasya in Dang for over 40 years.',
        gu: '૪૦ થી વધુ વર્ષો સુધી ડાંગના દંડકારણ્યમાં અખંડ મૌન તપસ્યા કરનાર સિદ્ધ સંત.'
      },
      image: '/assets/aistudio/IMG-20260924-WA0041.jpg_75e605b4.jpeg',
      badge: { mr: 'तपोनिधी मार्गदर्शक', hi: 'तपोनिधि मार्गदर्शक', en: 'Spiritual Guide', gu: 'તપોનિધિ માર્ગદર્શક' }
    },
    {
      id: 3,
      category: 'mandir',
      categoryName: { mr: 'अधिकृत फलक', hi: 'आधिकारिक फलक', en: 'Official Banner', gu: 'સત્તાવાર બોર્ડ' },
      title: {
        mr: 'श्री शिव अर्धनरेश्वर संपूर्ण धाम व सर्व देवता स्वरूप',
        hi: 'श्री शिव अर्धनरेश्वर संपूर्ण धाम एवं सर्व देवता स्वरूप',
        en: 'Complete Sanctuary View: Sacred Deities & Temple Overview',
        gu: 'શ્રી શિવ અર્ધનરેશ્વર સંપૂર્ણ ધામ અને સર્વ દેવતા સ્વરૂપ'
      },
      desc: {
        mr: 'नागदेवता, वाघोबा, राधा-कृष्ण, विठ्ठल-रुक्मिणी, राम-लक्ष्मण-जानकी व पंचमुखी हनुमान प्रस्थापित धाम.',
        hi: 'नागदेवता, वाघोबा, राधा-कृष्ण, विठ्ठल-रुक्मिणी और पंचमुखी हनुमान प्रतिष्ठापित पावन धाम।',
        en: 'Sanctuary housing Nagdevata, Waghoba, Radha-Krishna, and Panchamukhi Hanuman.',
        gu: 'નાગદેવતા, વાઘોબા, રાધા-કૃષ્ણ, વિઠ્ઠલ-રુકમિણી અને પંચમુખી હનુમાન પ્રતિષ્ઠિત પાવન ધામ.'
      },
      image: '/images/bimlal-official-banner.jpg',
      badge: { mr: 'अधिकृत फलक', hi: 'आधिकारिक फलक', en: 'Official Banner', gu: 'સત્તાવાર મુદ્રા' }
    },
    {
      id: 4,
      category: 'mandir',
      categoryName: { mr: 'दिव्य स्वरूप व वृत्तवार्ता', hi: 'दिव्य स्वरूप व मीडिया वार्ता', en: 'Divine Form & Media', gu: 'દિવ્ય સ્વરૂપ અને સમાચાર' },
      title: {
        mr: 'भगवान शिव अर्धनरेश्वर दिव्य रूप व ऐतिहासिक वृत्तसंग्रह',
        hi: 'भगवान शिव अर्धनरेश्वर दिव्य रूप एवं ऐतिहासिक समाचार संग्रह',
        en: 'Divine Form of Lord Shiva Ardhanarishwara & Historic Press Coverage',
        gu: 'ભગવાન શિવ અર્ધનરેશ્વર દિવ્ય રૂપ અને ઐતિહાસિક સમાચાર સંગ્રહ'
      },
      desc: {
        mr: 'बिमलाल धामच्या स्थापनेची ऐतिहासिक छायाचित्रे आणि वृत्तपत्रीय वार्तांकन अभिलेख.',
        hi: 'बिमलाल धाम की स्थापना के ऐतिहासिक छायाचित्र और समाचार पत्रीय दस्तावेज़।',
        en: 'Historical press documentation and holy archaical photographs of the Dham founding.',
        gu: 'બિમલાલ ધામની સ્થાપનાના ઐતિહાસિક ફોટોગ્રાફ્સ અને અખબારી અહેવાલો.'
      },
      image: '/images/banner_extracted_2.jpeg',
      badge: { mr: 'ऐतिहासिक दस्तऐवज', hi: 'ऐतिहासिक दस्तावेज़', en: 'Historic Archive', gu: 'ઐતિહાસિક દસ્તાવેજ' }
    },
    {
      id: 5,
      category: 'swamiji',
      categoryName: { mr: 'पूज्य स्वामीजी', hi: 'पूज्य स्वामीजी', en: 'Pujya Swamiji', gu: 'પૂજ્ય સ્વામીજી' },
      title: {
        mr: 'स्वामीजींचे भक्त सानिध्य व लोककल्याणकारी मार्गदर्शन',
        hi: 'स्वामीजी का भक्त सान्निध्य व जनकल्याणकारी मार्गदर्शन',
        en: 'Pujya Swamiji Guiding Pilgrims & Living Devotion',
        gu: 'સ્વામીજીનું ભક્ત સાન્નિધ્ય અને લોકકલ્યાણકારી માર્ગદર્શન'
      },
      desc: {
        mr: '"दुःखी, कष्टी आणि पिडीत होती संकटातुन मुक्त... सर्व सुखाचे आगर स्वामी कृपेचे सागर."',
        hi: '"दुःखी, पीड़ित जन होते हैं कष्टमुक्त... सर्व सुखों के सागर स्वामी कृपा के आगर।"',
        en: '"Devotees find relief and spiritual solace in the divine sanctuary under Swamiji\'s grace."',
        gu: '"દુઃખી, પીડિત લોકો સંકટમાંથી મુક્ત થાય છે... સર્વ સુખોના આગર સ્વામી કૃપાના સાગર."'
      },
      image: '/images/banner_extracted_9.jpeg',
      badge: { mr: 'कृपा सानिध्य', hi: 'कृपा सान्निध्य', en: 'Divine Grace', gu: 'કૃપા સાન્નિધ્ય' }
    },
    {
      id: 6,
      category: 'utsav',
      categoryName: { mr: 'उत्सव व महाआरती', hi: 'उत्सव व महाआरती', en: 'Festivals & Aarti', gu: 'ઉત્સવ અને મહાઆરતી' },
      title: {
        mr: 'दैनिक महापूजा, त्रिकाल आरती व भाविक मेळावा',
        hi: 'दैनिक महापूजा, त्रिकाल आरती एवं श्रद्धालु समागम',
        en: 'Daily Mahapooja, Trikal Aarti & Congregational Worship',
        gu: 'દૈનિક મહાપૂજા, ત્રિકાળ આરતી અને ભક્તોનો મેળાવડો'
      },
      desc: {
        mr: 'महाशिवरात्री, श्रावण मास आणि चैत्र नवरात्रातील अखंड भजन व महाप्रसाद सोहळा.',
        hi: 'महाशिवरात्रि, श्रावण मास और चैत्र नवरात्रि में अखंड भजन एवं महाप्रसाद अनुष्ठान।',
        en: 'Sacred Mahashivratri celebrations, Shravan devotional observances, and Anna Daan.',
        gu: 'મહાશિવરાત્રી, શ્રાવણ માસ અને ચૈત્ર નવરાત્રીમાં અખંડ ભજન અને મહાપ્રસાદ મહોત્સવ.'
      },
      image: '/images/banner_extracted_11.jpeg',
      badge: { mr: 'महाउत्सव', hi: 'महाउत्सव', en: 'Grand Festival', gu: 'મહોત્સવ' }
    },
    {
      id: 7,
      category: 'mandir',
      categoryName: { mr: 'गर्भगृह विधी', hi: 'गर्भगृह विधि', en: 'Sanctum Worship', gu: 'ગર્ભગૃહ વિધિ' },
      title: {
        mr: 'गर्भगृह प्रतिष्ठापित पावन देवता स्वरूप',
        hi: 'गर्भगृह प्रतिष्ठापित पावन देवता स्वरूप',
        en: 'Sanctum Deity Consecration & Traditional Rituals',
        gu: 'ગર્ભગૃહમાં પ્રતિષ્ઠિત પાવન દેવતા સ્વરૂપ'
      },
      desc: {
        mr: 'पारंपरिक वैदिक मंत्रोच्चारात होणारे पंचामृत अभिषेक व रुद्राभिषेक विधी.',
        hi: 'पारंपरिक वैदिक मंत्रोच्चार के साथ संपन्न होने वाले पंचामृत अभिषेक व रुद्राभिषेक।',
        en: 'Traditional Vedic chanting, sacred Panchamrit and Rudrabhisheka ceremonies.',
        gu: 'પારંપરિક વૈદિક મંત્રોચ્ચાર સાથે થતા પંચામૃત અભિષેક અને રુદ્રાભિષેક વિધિ.'
      },
      image: '/images/banner_extracted_6.jpeg',
      badge: { mr: 'गर्भगृह दर्शन', hi: 'गर्भगृह दर्शन', en: 'Sanctum', gu: 'ગર્ભગૃહ દર્શન' }
    },
    {
      id: 8,
      category: 'swamiji',
      categoryName: { mr: 'विश्वस्त मंडळ', hi: 'ट्रस्ट मंडल', en: 'Trust & Seal', gu: 'ટ્રસ્ટ મંડળ' },
      title: {
        mr: 'श्री शिव अर्धनरेश्वर नाग ज्योतिर्लिंग चॅरिटेबल ट्रस्ट अधिकृत मुद्रा',
        hi: 'श्री शिव अर्धनरेश्वर नाग ज्योतिर्लिंग चैरिटेबल ट्रस्ट आधिकारिक मुहर',
        en: 'Official Trust Emblem & Registered Sanctuary Seal',
        gu: 'શ્રી શિવ અર્ધનરેશ્વર નાગ જ્યોતિર્લિંગ ચેરિટેબલ ટ્રસ્ટ સત્તાવાર મુદ્રા'
      },
      desc: {
        mr: 'नोंदणी क्र. E / 169 / Dang - 19/11/2014 अंतर्गत संचालित अधिकृत लोककल्याण संस्था.',
        hi: 'पंजीकरण क्र. E / 169 / Dang - 19/11/2014 के अधीन संचालित आधिकारिक चैरिटेबल ट्रस्ट।',
        en: 'Official registered charitable trust managing pilgrim facilities and forest preservation.',
        gu: 'નોંધણી નં. E / 169 / Dang - 19/11/2014 હેઠળ સંચાલિત સત્તાવાર લોકકલ્યાણ સંસ્થા.'
      },
      image: '/temple_trust_logo.jpg',
      badge: { mr: 'अधिकृत नोंदणी', hi: 'आधिकारिक मुहर', en: 'Official Trust', gu: 'સત્તાવાર નોંધણી' }
    }
  ];

  let currentCategory = 'all';
  let currentIndex = 0;
  let filteredItems = [...GALLERY_ITEMS];
  let autoPlayTimer = null;
  let isAutoPlayActive = false;

  // DOM elements cache
  let trackEl, counterEl, dotsContainerEl, prevBtn, nextBtn;
  let lightboxModal, lightboxImg, lightboxCaption, lightboxTitle, lightboxBadge, lightboxCounter;

  function getCurrentLang() {
    if (window.BimlalI18n && window.BimlalI18n.currentLang) {
      return window.BimlalI18n.currentLang;
    }
    return document.documentElement.getAttribute('lang') || 'mr';
  }

  function getLocalizedText(obj) {
    if (!obj) return '';
    const lang = getCurrentLang();
    return obj[lang] || obj.mr || obj.en || '';
  }

  function renderCarouselSlides() {
    if (!trackEl) return;

    trackEl.innerHTML = '';

    if (filteredItems.length === 0) {
      const comingSoonTitle = window.BimlalI18n ? window.BimlalI18n.get('gallery_coming_soon') : 'लवकरच उपलब्ध होणार';
      const comingSoonSub = window.BimlalI18n ? window.BimlalI18n.get('gallery_coming_soon_sub') : 'या दालनातील छायाचित्रे लवकरच जोडली जातील.';
      trackEl.innerHTML = `
        <div class="w-full py-16 text-center text-[#57534E] bg-[#FAF4E8] rounded-2xl border border-[#C5A059]/30 mx-4">
          <span class="material-symbols-outlined text-4xl text-[#C5A059] mb-2">photo_library</span>
          <p class="font-devotional-title text-base font-bold text-[#792425]">${comingSoonTitle}</p>
          <p class="text-xs text-[#78716C] mt-1">${comingSoonSub}</p>
        </div>
      `;
      if (counterEl) counterEl.textContent = '० / ०';
      if (dotsContainerEl) dotsContainerEl.innerHTML = '';
      return;
    }

    filteredItems.forEach((item, idx) => {
      const slide = document.createElement('div');
      slide.className = 'gallery-slide flex-shrink-0 w-full md:w-[680px] lg:w-[780px] scroll-snap-align-center p-2 sm:p-3 transition-opacity duration-300';
      slide.setAttribute('data-index', idx);
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${idx + 1} of ${filteredItems.length}: ${getLocalizedText(item.title)}`);

      slide.innerHTML = `
        <div class="temple-card rounded-2xl overflow-hidden bg-[#FDF8EE] border-2 border-[#C5A059]/40 shadow-xl transition-all duration-300 hover:border-[#C5A059] flex flex-col group">
          <!-- Image Frame with Zoom / Fullscreen Trigger -->
          <div class="relative w-full h-72 sm:h-96 md:h-[420px] bg-gradient-to-b from-[#2B0C0D]/10 via-[#FAF2E4] to-[#F3E6D8] flex items-center justify-center overflow-hidden cursor-pointer select-none"
               onclick="window.BimlalGallery.openLightbox(${idx})">
            
            <img src="${item.image}" 
                 alt="${getLocalizedText(item.title)}" 
                 loading="lazy"
                 onerror="this.onerror=null; this.src='/temple_trust_logo.jpg'; this.classList.add('opacity-90');"
                 class="max-w-full max-h-full w-auto h-auto object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]" />
            
            <!-- Category Badge Pill -->
            <div class="absolute top-4 left-4 z-10">
              <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#792425]/90 text-white text-xs font-bold shadow-md backdrop-blur-xs border border-[#C5A059]/40">
                <span class="material-symbols-outlined text-[15px] text-[#FFD700]">photo_library</span>
                <span>${getLocalizedText(item.badge)}</span>
              </span>
            </div>

            <!-- Fullscreen Hint Pill -->
            <button type="button" 
                    class="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#1C1917]/75 hover:bg-[#792425] text-white flex items-center justify-center transition-all duration-200 shadow-md hover:scale-110"
                    title="मोठे करून पहा (Expand Fullscreen)"
                    aria-label="View Fullscreen">
              <span class="material-symbols-outlined text-[18px]">zoom_in</span>
            </button>

            <!-- Bottom Gradient Overlay for Touch Affordance -->
            <div class="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 to-transparent flex items-end justify-between px-4 py-2 pointer-events-none text-white/85 text-[11px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <span>छायाचित्र मोठे करण्यासाठी टॅप करा</span>
              <span class="inline-flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">touch_app</span>
                <span>स्वाइप करा ⇄</span>
              </span>
            </div>
          </div>

          <!-- Caption & Narrative Section -->
          <div class="p-5 sm:p-6 bg-[#FDF8EE] border-t border-[#C5A059]/30 flex flex-col justify-between gap-2">
            <div>
              <div class="flex items-center justify-between gap-2 mb-1.5">
                <span class="text-xs font-bold tracking-wider uppercase text-[#C5A059]">
                  ${getLocalizedText(item.categoryName)}
                </span>
                <span class="text-xs font-semibold text-[#78716C]">
                  #${idx + 1} / ${filteredItems.length}
                </span>
              </div>
              <h3 class="font-devotional-title text-lg sm:text-xl font-bold text-[#792425] leading-snug">
                ${getLocalizedText(item.title)}
              </h3>
              <p class="font-devotional-body text-xs sm:text-sm text-[#57534E] mt-1 leading-relaxed">
                ${getLocalizedText(item.desc)}
              </p>
            </div>

            <div class="pt-3 mt-1 border-t border-[#C5A059]/20 flex items-center justify-between">
              <button type="button" 
                      onclick="window.BimlalGallery.openLightbox(${idx})"
                      class="inline-flex items-center gap-1.5 text-xs font-bold text-[#792425] hover:text-[#9B2C2C] transition-colors py-1 px-2.5 rounded-lg hover:bg-[#792425]/10">
                <span class="material-symbols-outlined text-[16px]">fullscreen</span>
                <span>मोठे करून पहा (Expand View)</span>
              </button>
              <div class="text-[11px] text-[#78716C] italic">
                श्री शिव अर्धनरेश्वर धाम, बिमलाल
              </div>
            </div>
          </div>
        </div>
      `;

      trackEl.appendChild(slide);
    });

    renderDots();
    updateCounter();
    scrollToSlide(currentIndex, false);
  }

  function renderDots() {
    if (!dotsContainerEl) return;
    dotsContainerEl.innerHTML = '';

    filteredItems.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = `gallery-dot transition-all duration-300 rounded-full cursor-pointer ${
        idx === currentIndex 
          ? 'w-8 h-2.5 bg-[#792425]' 
          : 'w-2.5 h-2.5 bg-[#C5A059]/40 hover:bg-[#C5A059]'
      }`;
      dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
      dot.onclick = () => {
        scrollToSlide(idx, true);
      };
      dotsContainerEl.appendChild(dot);
    });
  }

  function updateCounter() {
    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${filteredItems.length}`;
    }
    // Update dots styling
    if (dotsContainerEl) {
      const dots = dotsContainerEl.querySelectorAll('.gallery-dot');
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.className = 'gallery-dot transition-all duration-300 rounded-full cursor-pointer w-8 h-2.5 bg-[#792425]';
        } else {
          dot.className = 'gallery-dot transition-all duration-300 rounded-full cursor-pointer w-2.5 h-2.5 bg-[#C5A059]/40 hover:bg-[#C5A059]';
        }
      });
    }
  }

  function scrollToSlide(index, smooth = true) {
    if (!trackEl || filteredItems.length === 0) return;
    
    // Bounds check
    if (index < 0) index = filteredItems.length - 1;
    if (index >= filteredItems.length) index = 0;

    currentIndex = index;

    const slides = trackEl.querySelectorAll('.gallery-slide');
    if (slides[currentIndex]) {
      const slide = slides[currentIndex];
      const trackWidth = trackEl.clientWidth;
      const slideWidth = slide.clientWidth;
      const slideLeft = slide.offsetLeft;
      
      const targetScroll = slideLeft - (trackWidth - slideWidth) / 2;

      trackEl.scrollTo({
        left: targetScroll,
        behavior: smooth ? 'smooth' : 'auto'
      });
    }

    updateCounter();
  }

  function prevSlide() {
    scrollToSlide(currentIndex - 1, true);
  }

  function nextSlide() {
    scrollToSlide(currentIndex + 1, true);
  }

  function filterCategory(cat) {
    currentCategory = cat;
    if (cat === 'all') {
      filteredItems = [...GALLERY_ITEMS];
    } else if (cat === 'past_present' || cat === 'mandir_past_present') {
      filteredItems = GALLERY_ITEMS.filter(item => item.category === 'past_present' || item.category === 'mandir_past_present');
    } else {
      filteredItems = GALLERY_ITEMS.filter(item => item.category === cat);
    }
    currentIndex = 0;

    // Update active filter pill buttons
    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
      const target = btn.getAttribute('data-filter');
      const isMatch = (target === cat) || 
                      ((target === 'past_present' || target === 'mandir_past_present') && (cat === 'past_present' || cat === 'mandir_past_present'));
      if (isMatch) {
        btn.className = 'gallery-filter-btn px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm bg-[#792425] text-white border border-[#792425]';
      } else {
        btn.className = 'gallery-filter-btn px-4 py-2 rounded-full text-xs font-bold transition-all bg-[#FAF2E4] text-[#57534E] border border-[#C5A059]/40 hover:border-[#792425] hover:text-[#792425]';
      }
    });

    renderCarouselSlides();
  }

  // Setup Touch and Mouse Drag on Track
  function setupGestures() {
    if (!trackEl) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let hasMoved = false;
    let touchStartX = 0;
    let touchStartY = 0;

    // Mouse drag events
    trackEl.addEventListener('mousedown', (e) => {
      isDown = true;
      hasMoved = false;
      trackEl.style.cursor = 'grabbing';
      trackEl.style.userSelect = 'none';
      startX = e.pageX - trackEl.offsetLeft;
      scrollLeft = trackEl.scrollLeft;
    });

    trackEl.addEventListener('mouseleave', () => {
      if (!isDown) return;
      isDown = false;
      trackEl.style.cursor = 'grab';
      snapToClosest();
    });

    trackEl.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      trackEl.style.cursor = 'grab';
      snapToClosest();
    });

    trackEl.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - trackEl.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(walk) > 10) {
        hasMoved = true;
      }
      trackEl.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile swiping
    trackEl.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    trackEl.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      // Ensure horizontal swipe intent
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      } else {
        snapToClosest();
      }
    }, { passive: true });

    // Snap to nearest slide after manual scrolling
    let scrollTimeout;
    trackEl.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        detectActiveSlideOnScroll();
      }, 120);
    }, { passive: true });
  }

  function detectActiveSlideOnScroll() {
    if (!trackEl) return;
    const trackCenter = trackEl.scrollLeft + trackEl.clientWidth / 2;
    const slides = trackEl.querySelectorAll('.gallery-slide');
    let closestIdx = 0;
    let closestDist = Infinity;

    slides.forEach((slide, idx) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const dist = Math.abs(trackCenter - slideCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = idx;
      }
    });

    if (closestIdx !== currentIndex) {
      currentIndex = closestIdx;
      updateCounter();
    }
  }

  function snapToClosest() {
    scrollToSlide(currentIndex, true);
  }

  // Lightbox Modal Implementation
  function openLightbox(index) {
    if (!filteredItems[index]) return;
    const item = filteredItems[index];

    if (!lightboxModal) return;

    lightboxImg.onerror = function() {
      this.onerror = null;
      this.src = '/temple_trust_logo.jpg';
    };
    lightboxImg.src = item.image;
    lightboxImg.alt = getLocalizedText(item.title);
    lightboxBadge.textContent = getLocalizedText(item.badge);
    lightboxTitle.textContent = getLocalizedText(item.title);
    lightboxCaption.textContent = getLocalizedText(item.desc);
    lightboxCounter.textContent = `${index + 1} / ${filteredItems.length}`;

    lightboxModal.classList.remove('hidden');
    lightboxModal.classList.add('flex');
    document.body.style.overflow = 'hidden';

    // Store active lightbox index for modal prev/next
    lightboxModal.setAttribute('data-lightbox-index', index);
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.add('hidden');
    lightboxModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  function lightboxPrev() {
    if (!lightboxModal) return;
    let idx = parseInt(lightboxModal.getAttribute('data-lightbox-index') || '0', 10);
    idx = idx <= 0 ? filteredItems.length - 1 : idx - 1;
    openLightbox(idx);
  }

  function lightboxNext() {
    if (!lightboxModal) return;
    let idx = parseInt(lightboxModal.getAttribute('data-lightbox-index') || '0', 10);
    idx = idx >= filteredItems.length - 1 ? 0 : idx + 1;
    openLightbox(idx);
  }

  function init() {
    trackEl = document.getElementById('gallery-carousel-track');
    counterEl = document.getElementById('gallery-slide-counter');
    dotsContainerEl = document.getElementById('gallery-dots-container');
    prevBtn = document.getElementById('gallery-prev-btn');
    nextBtn = document.getElementById('gallery-next-btn');

    // Lightbox elements
    lightboxModal = document.getElementById('gallery-lightbox-modal');
    lightboxImg = document.getElementById('lightbox-image');
    lightboxCaption = document.getElementById('lightbox-caption');
    lightboxTitle = document.getElementById('lightbox-title');
    lightboxBadge = document.getElementById('lightbox-badge');
    lightboxCounter = document.getElementById('lightbox-counter');

    if (prevBtn) prevBtn.onclick = () => prevSlide();
    if (nextBtn) nextBtn.onclick = () => nextSlide();

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') lightboxPrev();
        if (e.key === 'ArrowRight') lightboxNext();
        return;
      }

      // If gallery is in viewport, allow arrow key navigation
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        const rect = gallerySection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (e.key === 'ArrowLeft') prevSlide();
          if (e.key === 'ArrowRight') nextSlide();
        }
      }
    });

    // Touch swipe for Lightbox modal
    if (lightboxModal) {
      let lbTouchStartX = 0;
      lightboxModal.addEventListener('touchstart', (e) => {
        lbTouchStartX = e.touches[0].clientX;
      }, { passive: true });

      lightboxModal.addEventListener('touchend', (e) => {
        const diffX = e.changedTouches[0].clientX - lbTouchStartX;
        if (Math.abs(diffX) > 50) {
          if (diffX < 0) lightboxNext();
          else lightboxPrev();
        }
      }, { passive: true });
    }

    renderCarouselSlides();
    setupGestures();

    // Re-render strings when language changes
    document.querySelectorAll('[data-lang-btn]').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(() => {
          renderCarouselSlides();
        }, 100);
      });
    });

    window.addEventListener('bimlal-language-change', () => {
      renderCarouselSlides();
    });
  }

  async function handleUpload(fileList, explicitCategory) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    const cat = explicitCategory || currentCategory || 'past_present';
    const isPastPresent = (cat === 'past_present' || cat === 'mandir_past_present');
    const folder = isPastPresent ? 'past-present' : 'mandir-sohala';
    const filenames = isPastPresent
      ? ['mandir-past-01.jpg', 'mandir-present-01.jpg']
      : ['sohala-01.jpg', 'sohala-02.jpg', 'sohala-03.jpg', 'sohala-04.jpg', 'sohala-05.jpg'];

    let uploadedCount = 0;

    for (let i = 0; i < files.length && i < filenames.length; i++) {
      const file = files[i];
      const targetName = filenames[i];

      try {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });

        const res = await fetch('/api/gallery/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder: folder, filename: targetName, base64Data: base64 })
        });
        if (res.ok) {
          uploadedCount++;
        }
      } catch (err) {
        console.error('Upload error for', targetName, err);
      }
    }

    if (uploadedCount > 0) {
      if (typeof window.showDevoteeNotice === 'function') {
        const noticeCategory = isPastPresent ? 'मंदिर भूतकाळ व वर्तमान' : 'सोहळा छायाचित्रे';
        window.showDevoteeNotice(`${noticeCategory} यशस्वीरित्या जोडली (${uploadedCount} फोटो)`, 'photo_library');
      }
      GALLERY_ITEMS.forEach(item => {
        if (item.category === cat || item.category === folder || (isPastPresent && (item.category === 'past_present' || item.category === 'mandir_past_present'))) {
          item.image = `${item.image.split('?')[0]}?t=${Date.now()}`;
        }
      });
      renderCarouselSlides();
    }
  }

  // Public API attached to window
  window.BimlalGallery = {
    init: init,
    filterCategory: filterCategory,
    prevSlide: prevSlide,
    nextSlide: nextSlide,
    scrollToSlide: scrollToSlide,
    openLightbox: openLightbox,
    closeLightbox: closeLightbox,
    lightboxPrev: lightboxPrev,
    lightboxNext: lightboxNext,
    handleUpload: handleUpload,
    getItems: () => filteredItems
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
