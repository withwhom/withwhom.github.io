// Conjugle — sentence bank and release schedule.
// Rules for adding sentences: see the Conjugle section of CLAUDE.md.
// Check with: node scripts/check-conjugle.js
//
// Item fields
//   id   fixed integer, never reused or renumbered
//   v    infinitive shown to the player
//   s    sentence; "___" marks the single blank
//   a    accepted answers (lowercase; every form that fits the sentence)
//   t    tense key (see TENSES in daily.js)
//   ipa  pronunciation of a[0]: "." between syllables, "‿" for a liaison
//   n    note in Korean: the clue that fixes the tense + the conjugation point
var CONJUGLE = {
  // Append-only. A new release must start on a future date (see daily.js).
  releases: [
    { from: "2026-10-29", maxId: 153 }
  ],

  bank: [
    // ---------- présent ----------
    { id: 1, v: "aller", s: "Chaque samedi, mes parents ___ au marché, puis ils rentrent déjeuner à la maison.", a: ["vont"], t: "present", ipa: "vɔ̃", n: "chaque samedi와 뒤의 rentrent(현재)이 지금도 반복되는 습관을 나타내요. aller의 3인칭 복수는 불규칙형 vont." },
    { id: 2, v: "faire", s: "En ce moment, vous ___ du bruit et le bébé essaie de dormir.", a: ["faites"], t: "present", ipa: "fɛt", n: "en ce moment과 essaie(현재)이 지금 일어나는 일임을 보여 줘요. faire의 vous 형은 -ez가 아닌 faites." },
    { id: 3, v: "prendre", s: "Le matin, nous ___ toujours un café avant de partir, et ensuite nous marchons jusqu'à la gare.", a: ["prenons"], t: "present", ipa: "pʁə.nɔ̃", n: "toujours와 marchons(현재)이 현재의 습관을 가리켜요. prendre는 nous/vous에서 n이 하나: prenons, prenez." },
    { id: 4, v: "pouvoir", s: "Ici, on ne ___ pas fumer : c'est écrit sur la porte.", a: ["peut"], t: "present", ipa: "pø", n: "c'est écrit(현재)이 지금 유효한 규칙임을 알려 줘요. pouvoir의 il/on 형은 t로 끝나는 peut." },
    { id: 5, v: "vouloir", s: "Mes enfants ___ toujours des bonbons quand nous passons devant cette boulangerie.", a: ["veulent"], t: "present", ipa: "vœl", n: "quand nous passons(현재)과 toujours가 현재의 반복을 나타내요. vouloir 3인칭 복수는 어간이 veul-로 바뀌어요." },
    { id: 6, v: "savoir", s: "Est-ce que tu ___ où sont mes clés ? Je les cherche depuis une heure.", a: ["sais"], t: "present", ipa: "sɛ", n: "sont, je cherche depuis une heure(현재)가 지금 상황이에요. savoir: je sais, tu sais, il sait." },
    { id: 7, v: "venir", s: "D'où ___-vous ? — Je viens de Séoul.", a: ["venez"], t: "present", ipa: "və.ne", n: "대답 Je viens de Séoul이 현재형이므로 질문도 현재예요. venir의 vous 형은 어간 ven-을 쓴 venez." },
    { id: 8, v: "devoir", s: "Les élèves ___ porter un uniforme dans cette école : c'est le règlement.", a: ["doivent"], t: "present", ipa: "dwav", n: "c'est le règlement이 지금 유효한 의무를 나타내요. devoir 3인칭 복수는 doivent." },
    { id: 9, v: "se lever", s: "D'habitude, je ___ à sept heures, mais le dimanche je reste au lit.", a: ["me lève"], t: "present", ipa: "mə.lɛv", n: "d'habitude와 je reste(현재)가 현재 습관이에요. lever는 묵음 어미 앞에서 e → è: je me lève." },
    { id: 10, v: "s'appeler", s: "Bonjour, je ___ Camille, et voici mon frère Hugo.", a: ["m'appelle"], t: "present", ipa: "ma.pɛl", n: "Bonjour, voici가 지금 자기소개하는 장면이에요. appeler는 묵음 어미 앞에서 l을 겹쳐요: je m'appelle." },
    { id: 11, v: "boire", s: "Vous ___ du thé ou du café le matin ? Moi, je préfère le thé.", a: ["buvez"], t: "present", ipa: "by.ve", n: "je préfère(현재)로 이어지는 현재 습관 질문이에요. boire의 nous/vous 어간은 buv-: buvons, buvez." },
    { id: 12, v: "dire", s: "Qu'est-ce que vous ___ ? Je ne vous entends pas, il y a trop de bruit.", a: ["dites"], t: "present", ipa: "dit", n: "Je ne vous entends pas(현재)가 지금 순간을 가리켜요. dire의 vous 형은 faites, êtes처럼 -tes로 끝나는 dites." },
    { id: 13, v: "connaître", s: "Tu ___ ce restaurant ? Il est juste à côté de chez moi.", a: ["connais"], t: "present", ipa: "kɔ.nɛ", n: "il est(현재)와 함께 지금 알고 있는지를 묻는 문장이에요. connaître: je/tu connais, il connaît." },
    { id: 14, v: "mettre", s: "Quand il fait froid comme aujourd'hui, je ___ toujours une écharpe.", a: ["mets"], t: "present", ipa: "mɛ", n: "il fait froid comme aujourd'hui와 toujours가 현재 습관이에요. mettre 단수형은 mets, mets, met." },
    { id: 15, v: "finir", s: "Les cours ___ à cinq heures, et après je vais à la bibliothèque.", a: ["finissent"], t: "present", ipa: "fi.nis", n: "je vais(현재)로 이어지는 일상 묘사예요. 2군 동사는 복수 어간에 -iss-가 들어가요: finissent." },
    { id: 16, v: "lire", s: "Qu'est-ce que tu ___ en ce moment ? — Un roman de Camus ; il est passionnant.", a: ["lis"], t: "present", ipa: "li", n: "en ce moment과 il est passionnant이 지금 읽는 책을 가리켜요. lire: je lis, tu lis, il lit." },
    { id: 17, v: "se coucher", s: "Le soir, mes grands-parents ___ très tôt : ils dorment déjà à neuf heures.", a: ["se couchent"], t: "present", ipa: "sə.kuʃ", n: "ils dorment(현재)이 현재 습관임을 확정해 줘요. 3인칭 복수의 재귀대명사도 se." },

    // ---------- passé composé ----------
    { id: 18, v: "aller", s: "Hier soir, Léa et Chloé ___ au cinéma, puis elles ont dîné ensemble.", a: ["sont allées"], t: "passe_compose", ipa: "sɔ̃‿ta.le", n: "hier soir와 ont dîné가 완료된 사건이에요. être 조동사이므로 과거분사가 여성 복수 주어에 일치: allées." },
    { id: 19, v: "naître", s: "Mon grand-père ___ en 1950 dans un petit village de Bretagne.", a: ["est né"], t: "passe_compose", ipa: "ɛ.ne", n: "en 1950이라는 특정 시점의 일회적 사건이에요. naître는 être 조동사, 과거분사는 né." },
    { id: 20, v: "venir", s: "Ma tante ___ nous voir le week-end dernier et elle est repartie dimanche soir.", a: ["est venue"], t: "passe_compose", ipa: "ɛ.və.ny", n: "le week-end dernier와 est repartie가 완료된 사건이에요. 주어 ma tante에 맞춰 venue." },
    { id: 21, v: "partir", s: "Ma sœur et moi, nous ___ en vacances le mois dernier.", a: ["sommes partis", "sommes parties"], t: "passe_compose", ipa: "sɔm.paʁ.ti", n: "le mois dernier의 일회적 사건이라 복합과거예요. 화자(moi)의 성별을 알 수 없어 partis와 parties 모두 정답." },
    { id: 22, v: "se réveiller", s: "Ce matin, Julie ___ en retard, alors elle a raté son bus.", a: ["s'est réveillée"], t: "passe_compose", ipa: "sɛ.ʁe.ve.je", n: "ce matin과 a raté가 완료된 사건이에요. 대명동사는 être 조동사이고 se가 직접목적어라 주어에 일치: réveillée." },
    { id: 23, v: "se laver", s: "Ce midi, avant de manger, les enfants ___ les mains, puis ils se sont mis à table.", a: ["se sont lavé"], t: "passe_compose", ipa: "sə.sɔ̃.la.ve", n: "se sont mis와 이어지는 완료 동작이에요. 직접목적어 les mains가 뒤에 오고 se는 간접목적어라 과거분사는 일치하지 않아요: lavé." },
    { id: 24, v: "faire", s: "La semaine dernière, nous ___ une longue randonnée dans les Alpes.", a: ["avons fait"], t: "passe_compose", ipa: "a.vɔ̃.fɛ", n: "la semaine dernière의 한 번의 완결된 사건이에요. faire의 과거분사는 fait." },
    { id: 25, v: "prendre", s: "Il pleuvait, alors j'ai fermé la fenêtre et Paul ___ un parapluie avant de sortir.", a: ["a pris"], t: "passe_compose", ipa: "a.pʁi", n: "j'ai fermé에 이어지는 연속 동작이라 복합과거예요(배경인 il pleuvait만 반과거). prendre의 과거분사는 pris." },
    { id: 26, v: "mettre", s: "Elle ___ sa plus belle robe pour le mariage de sa cousine, samedi dernier.", a: ["a mis"], t: "passe_compose", ipa: "a.mi", n: "samedi dernier 결혼식이라는 일회적 사건이에요. mettre의 과거분사는 mis." },
    { id: 27, v: "voir", s: "Tu ___ le dernier film de Bong Joon-ho ? Moi, je l'ai vu hier.", a: ["as vu"], t: "passe_compose", ipa: "a.vy", n: "대답 je l'ai vu hier와 짝을 이루는 경험 질문이에요. voir의 과거분사는 vu." },
    { id: 28, v: "descendre", s: "À la station Châtelet, les touristes ___ du métro et sont montés dans un bus.", a: ["sont descendus"], t: "passe_compose", ipa: "sɔ̃.de.sɑ̃.dy", n: "sont montés와 이어지는 연속 동작이에요. 이동 동사 descendre는 être 조동사, 주어에 맞춰 descendus." },
    { id: 29, v: "tomber", s: "Hier, en courant dans la cour, la petite Inès ___ et s'est fait mal au genou.", a: ["est tombée"], t: "passe_compose", ipa: "ɛ.tɔ̃.be", n: "hier와 s'est fait mal이 완료된 사건이에요. tomber는 être 조동사, 주어 Inès에 맞춰 tombée." },
    { id: 30, v: "mourir", s: "Victor Hugo ___ à Paris en 1885.", a: ["est mort"], t: "passe_compose", ipa: "ɛ.mɔʁ", n: "en 1885라는 특정 시점의 사건이에요. mourir는 être 조동사, 과거분사는 불규칙형 mort." },
    { id: 31, v: "écrire", s: "Hier, ma grand-mère m'___ une longue lettre.", a: ["a écrit"], t: "passe_compose", ipa: "a.e.kʁi", n: "hier의 일회적 행동이에요. écrire의 과거분사는 écrit이고, 간접목적어 m'(= à moi)에는 일치하지 않아요." },
    { id: 32, v: "recevoir", s: "Ce matin, nous ___ ton colis : merci beaucoup !", a: ["avons reçu"], t: "passe_compose", ipa: "a.vɔ̃.ʁə.sy", n: "ce matin과 merci가 방금 완료된 일을 가리켜요. recevoir의 과거분사는 reçu(ç 주의)." },
    { id: 33, v: "s'asseoir", s: "Dès que le professeur est entré, les élèves ___ en silence.", a: ["se sont assis"], t: "passe_compose", ipa: "sə.sɔ̃‿ta.si", n: "dès que ... est entré에 바로 이어진 한 번의 동작이에요. 대명동사라 être 조동사, 주어에 맞춰 assis." },
    { id: 34, v: "sortir", s: "Samedi dernier, Thomas et Marie ___ jusqu'à minuit, puis ils sont rentrés en taxi.", a: ["sont sortis"], t: "passe_compose", ipa: "sɔ̃.sɔʁ.ti", n: "samedi dernier와 sont rentrés가 완료된 사건이에요. 남녀가 섞인 주어는 남성 복수로 일치: sortis." },

    // ---------- imparfait ----------
    { id: 35, v: "être", s: "Quand j'___ petit, j'habitais à la campagne.", a: ["étais"], t: "imparfait", ipa: "e.tɛ", n: "j'habitais와 함께 과거의 상태를 묘사해요. être의 반과거 어간은 불규칙형 ét-." },
    { id: 36, v: "avoir", s: "À cette époque, nous ___ un chien qui s'appelait Rex.", a: ["avions"], t: "imparfait", ipa: "a.vjɔ̃", n: "à cette époque와 s'appelait가 과거의 지속 상태예요. avoir 반과거: nous avions." },
    { id: 37, v: "faire", s: "Autrefois, ma grand-mère ___ son pain elle-même tous les matins.", a: ["faisait"], t: "imparfait", ipa: "fə.zɛ", n: "autrefois와 tous les matins가 과거의 습관이에요. faisait의 ai는 [ə]로 발음해요." },
    { id: 38, v: "aller", s: "Chaque été, quand nous étions enfants, nous ___ à la mer avec nos cousins.", a: ["allions"], t: "imparfait", ipa: "a.ljɔ̃", n: "chaque été와 quand nous étions enfants가 과거의 반복이에요. 반과거 어간은 현재 nous 형(allons)에서 와요: all- + -ions." },
    { id: 39, v: "pleuvoir", s: "Il ___ depuis le matin quand nous sommes enfin sortis.", a: ["pleuvait"], t: "imparfait", ipa: "plø.vɛ", n: "비가 오던 배경(depuis le matin) 위로 sommes sortis라는 사건이 일어나요. pleuvoir 반과거는 il pleuvait." },
    { id: 40, v: "dormir", s: "Quand le téléphone a sonné, je ___ profondément.", a: ["dormais"], t: "imparfait", ipa: "dɔʁ.mɛ", n: "a sonné가 끼어든 사건이고, 그때 진행 중이던 동작은 반과거예요. dormir: je dormais." },
    { id: 41, v: "regarder", s: "Les enfants ___ la télévision quand leur père est rentré du travail.", a: ["regardaient"], t: "imparfait", ipa: "ʁə.ɡaʁ.dɛ", n: "est rentré가 끼어들 때 진행 중이던 동작이에요. 3인칭 복수 어미 -aient은 [ɛ]로 발음해요." },
    { id: 42, v: "vouloir", s: "Quand elle avait dix ans, ma sœur ___ devenir astronaute.", a: ["voulait"], t: "imparfait", ipa: "vu.lɛ", n: "quand elle avait dix ans이 과거의 지속 상태(바람)를 나타내요. vouloir 반과거는 voulait." },
    { id: 43, v: "pouvoir", s: "Avant l'invention du téléphone, on ne ___ pas parler à quelqu'un qui habitait loin.", a: ["pouvait"], t: "imparfait", ipa: "pu.vɛ", n: "avant l'invention과 habitait가 과거의 일반적 상황이에요. pouvoir 반과거는 pouvait." },
    { id: 44, v: "se baigner", s: "Quand ils vivaient à Nice, mes grands-parents ___ dans la mer tous les matins.", a: ["se baignaient"], t: "imparfait", ipa: "sə.bɛ.ɲɛ", n: "quand ils vivaient와 tous les matins가 과거 습관이에요. 재귀대명사 se + baignaient." },
    { id: 45, v: "savoir", s: "Je ne ___ pas que tu parlais coréen ! Depuis quand ?", a: ["savais"], t: "imparfait", ipa: "sa.vɛ", n: "parlais와 이어져 그때까지 몰랐던 과거 상태를 나타내요. savoir 반과거는 savais." },
    { id: 46, v: "manger", s: "Pendant les vacances, nous ___ toujours sur la terrasse, sauf quand il pleuvait.", a: ["mangions"], t: "imparfait", ipa: "mɑ̃.ʒjɔ̃", n: "sauf quand il pleuvait가 과거 습관임을 확정해요. manger는 a/o 앞에서 e를 넣지만(mangeais) i 앞에서는 넣지 않아요: mangions." },
    { id: 47, v: "commencer", s: "Quand j'étais au lycée, les cours ___ à huit heures.", a: ["commençaient"], t: "imparfait", ipa: "kɔ.mɑ̃.sɛ", n: "quand j'étais au lycée가 과거 습관이에요. a 앞에서 c → ç: commençaient." },
    { id: 48, v: "lire", s: "Pendant que tu ___ dans le salon, j'ai préparé le dîner.", a: ["lisais"], t: "imparfait", ipa: "li.zɛ", n: "pendant que가 진행 중이던 배경 동작을, j'ai préparé가 그동안 일어난 사건을 나타내요. lire 반과거 어간은 lis-." },
    { id: 49, v: "vivre", s: "À l'époque, mes parents ___ à Lyon, dans un petit appartement.", a: ["vivaient"], t: "imparfait", ipa: "vi.vɛ", n: "à l'époque가 과거의 지속 상태예요. vivre 반과거 어간은 viv-." },
    { id: 50, v: "croire", s: "Quand j'étais petit, je ___ au père Noël.", a: ["croyais"], t: "imparfait", ipa: "kʁwa.jɛ", n: "quand j'étais petit이 과거의 믿음(상태)이에요. croire 반과거는 i 대신 y: croyais." },
    { id: 51, v: "être", s: "Il ___ une fois une princesse qui vivait dans un château.", a: ["était"], t: "imparfait", ipa: "e.tɛ", n: "옛이야기의 첫머리 Il était une fois(옛날 옛적에)는 반과거로 굳은 표현이고, vivait도 반과거예요." },

    // ---------- plus-que-parfait ----------
    { id: 52, v: "partir", s: "Quand nous sommes arrivés à la gare, le train ___ depuis dix minutes.", a: ["était parti"], t: "plus_que_parfait", ipa: "e.tɛ.paʁ.ti", n: "sommes arrivés보다 앞서 완료된 일 + depuis dix minutes예요. être 반과거 + 과거분사, le train에 맞춰 parti." },
    { id: 53, v: "finir", s: "Elle m'a dit qu'elle ___ son mémoire la veille.", a: ["avait fini"], t: "plus_que_parfait", ipa: "a.vɛ.fi.ni", n: "a dit que(과거) + la veille(그 전날): 과거 기준보다 앞선 일이라 대과거예요." },
    { id: 54, v: "laisser", s: "Ce matin-là, j'ai cherché partout mon portefeuille : en fait, je l'___ au bureau la veille au soir.", a: ["avais laissé"], t: "plus_que_parfait", ipa: "a.vɛ.le.se", n: "la veille au soir가 j'ai cherché보다 앞선 시점이에요. 앞에 온 직접목적어 l'(= le portefeuille)이 남성 단수라 laissé." },
    { id: 55, v: "se coucher", s: "Quand Marc a appelé à minuit, sa femme ___ depuis longtemps.", a: ["s'était couchée"], t: "plus_que_parfait", ipa: "se.tɛ.ku.ʃe", n: "a appelé 시점에 이미 완료된 일 + depuis longtemps예요. 대명동사라 être, 주어 sa femme에 맞춰 couchée." },
    { id: 56, v: "prévenir", s: "Si tu m'___ plus tôt, je serais venu te chercher à l'aéroport.", a: ["avais prévenu"], t: "plus_que_parfait", ipa: "a.vɛ.pʁe.və.ny", n: "주절이 조건법 과거(serais venu)라서 si절은 대과거예요: 과거 사실의 반대 가정. prévenir의 과거분사는 prévenu." },
    { id: 57, v: "rentrer", s: "Quand je suis arrivée à la fête vers minuit, la plupart des invités ___ chez eux depuis longtemps.", a: ["étaient rentrés"], t: "plus_que_parfait", ipa: "e.tɛ.ʁɑ̃.tʁe", n: "suis arrivée보다 앞서 완료된 일 + depuis longtemps예요. la plupart des invités는 복수로 일치: rentrés." },
    { id: 58, v: "rencontrer", s: "En 2010, ma mère m'a raconté qu'elle ___ un célèbre chanteur l'année précédente.", a: ["avait rencontré"], t: "plus_que_parfait", ipa: "a.vɛ.ʁɑ̃.kɔ̃.tʁe", n: "a raconté(과거) + l'année précédente(그 전해): 과거 기준보다 앞선 일이에요." },
    { id: 59, v: "recevoir", s: "J'ai enfin compris pourquoi elle pleurait : elle ___ une mauvaise nouvelle le matin même.", a: ["avait reçu"], t: "plus_que_parfait", ipa: "a.vɛ.ʁə.sy", n: "pleurait의 원인이 그보다 앞선 le matin même에 일어났어요. recevoir의 과거분사는 reçu." },
    { id: 60, v: "mettre", s: "Il faisait très chaud dans la salle, car quelqu'un ___ le chauffage au maximum avant notre arrivée.", a: ["avait mis"], t: "plus_que_parfait", ipa: "a.vɛ.mi", n: "avant notre arrivée: 과거 상태(faisait)보다 앞서 완료된 행동이에요. mettre의 과거분사는 mis." },
    { id: 61, v: "naître", s: "Mes parents ont déménagé à Séoul en 2005 ; mon frère y ___ trois ans plus tôt.", a: ["était né"], t: "plus_que_parfait", ipa: "e.tɛ.ne", n: "trois ans plus tôt가 ont déménagé(과거)보다 앞선 시점이에요. naître는 être 조동사." },
    { id: 62, v: "se disputer", s: "Ce jour-là, ils ne se parlaient plus parce qu'ils ___ la veille.", a: ["s'étaient disputés"], t: "plus_que_parfait", ipa: "se.tɛ.dis.py.te", n: "la veille의 일이 ne se parlaient plus(과거)의 원인이에요. 대명동사, 주어 ils에 맞춰 disputés." },
    { id: 63, v: "rester", s: "Si nous ___ à la maison, nous n'aurions pas eu cet accident.", a: ["étions restés", "étions restées"], t: "plus_que_parfait", ipa: "e.tjɔ̃.ʁɛs.te", n: "si + 대과거 ↔ 주절 조건법 과거(aurions eu). nous의 성별을 알 수 없어 restés와 restées 모두 정답." },
    { id: 64, v: "savoir", s: "Si elle ___ la vérité, elle aurait réagi autrement.", a: ["avait su"], t: "plus_que_parfait", ipa: "a.vɛ.sy", n: "si + 대과거 ↔ aurait réagi: 과거 사실의 반대 가정이에요. savoir의 과거분사는 su." },
    { id: 65, v: "disparaître", s: "Quand la police est arrivée, les voleurs ___ depuis longtemps.", a: ["avaient disparu"], t: "plus_que_parfait", ipa: "a.vɛ.dis.pa.ʁy", n: "est arrivée보다 앞서 완료된 일 + depuis longtemps예요. disparaître의 과거분사는 불규칙형 disparu." },
    { id: 66, v: "choisir", s: "Elle a rendu à la bibliothèque les livres qu'elle ___ le mois précédent.", a: ["avait choisis"], t: "plus_que_parfait", ipa: "a.vɛ.ʃwa.zi", n: "le mois précédent가 a rendu보다 앞선 시점이에요. 직접목적어 que(= les livres)가 앞에 있어 avoir 조동사여도 일치: choisis." },
    { id: 67, v: "dîner", s: "Chaque soir, une fois qu'il ___, mon grand-père allait se promener.", a: ["avait dîné"], t: "plus_que_parfait", ipa: "a.vɛ.di.ne", n: "une fois que는 완료를 요구하고, 주절 allait(반과거 습관)보다 앞선 일이라 대과거예요." },
    { id: 68, v: "prêter", s: "Je lui ai rendu le livre qu'il m'___ deux mois plus tôt.", a: ["avait prêté"], t: "plus_que_parfait", ipa: "a.vɛ.pʁɛ.te", n: "deux mois plus tôt가 ai rendu보다 앞선 시점이에요. 간접목적어 m'에는 과거분사가 일치하지 않아요." },

    // ---------- futur simple ----------
    { id: 69, v: "être", s: "Quand tu ___ grand, tu comprendras.", a: ["seras"], t: "futur_simple", ipa: "sə.ʁa", n: "주절 comprendras가 미래이고, 프랑스어는 미래를 가리키는 quand절에도 미래형을 써요. être 미래 어간은 ser-." },
    { id: 70, v: "avoir", s: "Dès que nous ___ les résultats, nous vous appellerons.", a: ["aurons"], t: "futur_simple", ipa: "o.ʁɔ̃", n: "주절 appellerons가 미래라 dès que절도 미래형이에요. avoir 미래 어간은 aur-." },
    { id: 71, v: "aller", s: "Quand vous ___ à Paris l'été prochain, n'oubliez pas de visiter le musée d'Orsay.", a: ["irez"], t: "futur_simple", ipa: "i.ʁe", n: "quand + l'été prochain: 미래의 일이라 시간절도 미래형이에요. aller 미래 어간은 ir-." },
    { id: 72, v: "faire", s: "Selon la météo, il ___ beau demain, mais il pleuvra dimanche.", a: ["fera"], t: "futur_simple", ipa: "fə.ʁa", n: "뒤의 il pleuvra(미래)와 짝을 이루는 일기예보예요. faire 미래 어간은 fer-." },
    { id: 73, v: "venir", s: "Lorsqu'elle ___ nous voir le mois prochain, elle apportera ses photos de voyage.", a: ["viendra"], t: "futur_simple", ipa: "vjɛ̃.dʁa", n: "le mois prochain + 주절 apportera(미래)예요. venir 미래 어간은 viendr-." },
    { id: 74, v: "pouvoir", s: "Quand tu ___ conduire, tu m'emmèneras à la mer ?", a: ["pourras"], t: "futur_simple", ipa: "pu.ʁa", n: "주절 m'emmèneras가 미래라 quand절도 미래형이에요. pouvoir 미래 어간은 r이 두 개인 pourr-." },
    { id: 75, v: "voir", s: "Quand tu ___ ma nouvelle maison, tu ne la reconnaîtras pas.", a: ["verras"], t: "futur_simple", ipa: "vɛ.ʁa", n: "주절 ne la reconnaîtras pas가 미래예요. voir 미래 어간은 verr-." },
    { id: 76, v: "savoir", s: "Dès que je ___ la date, je te l'enverrai par message.", a: ["saurai"], t: "futur_simple", ipa: "so.ʁe", n: "주절 enverrai가 미래라 dès que절도 미래형이에요. savoir 미래 어간은 saur-." },
    { id: 77, v: "devoir", s: "Quand tu seras au lycée, tu ___ te lever à six heures tous les matins : les cours commenceront à sept heures et demie.", a: ["devras"], t: "futur_simple", ipa: "də.vʁa", n: "quand tu seras, commenceront이 모두 미래예요. devoir 미래 어간은 devr-." },
    { id: 78, v: "envoyer", s: "Dès que nous aurons reçu votre paiement, nous vous ___ la facture.", a: ["enverrons"], t: "futur_simple", ipa: "ɑ̃.vɛ.ʁɔ̃", n: "dès que + 전미래(aurons reçu) 뒤의 주절은 단순미래예요. envoyer 미래 어간은 불규칙형 enverr-." },
    { id: 79, v: "courir", s: "Quand elle ___ son premier marathon en avril, toute la famille viendra l'encourager.", a: ["courra"], t: "futur_simple", ipa: "ku.ʁa", n: "en avril + 주절 viendra(미래)예요. courir 미래 어간은 r이 두 개인 courr-." },
    { id: 80, v: "se marier", s: "Quand ils ___ en mai prochain, ils partiront en voyage au Japon.", a: ["se marieront"], t: "futur_simple", ipa: "sə.ma.ʁi.ʁɔ̃", n: "en mai prochain + 주절 partiront(미래)예요. 어간은 부정사 marier 그대로: marieront." },
    { id: 81, v: "obtenir", s: "Lorsque vous ___ votre diplôme l'année prochaine, que ferez-vous ?", a: ["obtiendrez"], t: "futur_simple", ipa: "ɔp.tjɛ̃.dʁe", n: "l'année prochaine와 ferez(미래)예요. obtenir는 tenir처럼 활용: 미래 어간 obtiendr-." },
    { id: 82, v: "acheter", s: "Quand nous ___ une maison l'an prochain, nous adopterons un chat.", a: ["achèterons"], t: "futur_simple", ipa: "a.ʃɛ.tʁɔ̃", n: "l'an prochain + 주절 adopterons(미래)예요. acheter는 미래 전 인칭에서 e → è: achèterons." },
    { id: 83, v: "appeler", s: "Dès qu'ils seront arrivés à l'hôtel, ils nous ___.", a: ["appelleront"], t: "futur_simple", ipa: "a.pɛl.ʁɔ̃", n: "dès que + 전미래(seront arrivés) 뒤의 주절은 단순미래예요. appeler는 미래에서 l을 겹쳐요: appelleront." },
    { id: 84, v: "voler", s: "Dans cent ans, les voitures ___ peut-être au-dessus des villes, et personne ne conduira plus.", a: ["voleront"], t: "futur_simple", ipa: "vɔl.ʁɔ̃", n: "dans cent ans와 conduira(미래)예요. 규칙 1군 동사라 부정사 + -ont." },
    { id: 85, v: "mettre", s: "Dès que tu ___ ce manteau cet hiver, tu ne voudras plus l'enlever.", a: ["mettras"], t: "futur_simple", ipa: "mɛ.tʁa", n: "cet hiver + 주절 voudras(미래)라 dès que절도 미래형이에요. mettre 미래 어간은 mettr-." },

    // ---------- conditionnel présent ----------
    { id: 86, v: "aller", s: "Si j'avais plus de temps, j'___ plus souvent au théâtre.", a: ["irais"], t: "conditionnel_present", ipa: "i.ʁɛ", n: "si + 반과거(avais) ↔ 주절 조건법 현재: 현재 사실의 반대 가정이에요. aller의 조건법 어간은 ir-." },
    { id: 87, v: "faire", s: "Si nous gagnions au loto, nous ___ le tour du monde.", a: ["ferions"], t: "conditionnel_present", ipa: "fə.ʁjɔ̃", n: "si + 반과거(gagnions) ↔ 조건법 현재예요. faire 어간 fer- + -ions." },
    { id: 88, v: "être", s: "À ta place, je ___ plus prudent avec cet argent.", a: ["serais"], t: "conditionnel_present", ipa: "sə.ʁɛ", n: "à ta place(내가 너라면)는 가정이라 조건법이에요. être의 조건법 어간은 ser-." },
    { id: 89, v: "avoir", s: "Si tu te couchais plus tôt, tu n'___ pas sommeil en classe.", a: ["aurais"], t: "conditionnel_present", ipa: "o.ʁɛ", n: "si + 반과거(couchais) ↔ 조건법 현재예요. avoir의 조건법 어간은 aur-." },
    { id: 90, v: "pouvoir", s: "Si elle parlait anglais, elle ___ travailler à Londres.", a: ["pourrait"], t: "conditionnel_present", ipa: "pu.ʁɛ", n: "si + 반과거(parlait) ↔ 조건법 현재예요. pouvoir의 조건법 어간은 pourr-." },
    { id: 91, v: "vouloir", s: "Si j'étais riche, je ___ vivre dans une maison au bord de la mer.", a: ["voudrais"], t: "conditionnel_present", ipa: "vu.dʁɛ", n: "si + 반과거(étais) ↔ 조건법 현재예요. vouloir의 조건법 어간은 voudr-." },
    { id: 92, v: "devoir", s: "Si tu étais vraiment malade, tu ___ voir un médecin.", a: ["devrais"], t: "conditionnel_present", ipa: "də.vʁɛ", n: "si + 반과거(étais) ↔ 조건법 현재예요. devoir의 조건법 어간은 devr-." },
    { id: 93, v: "venir", s: "Il m'a promis qu'il ___ le lendemain.", a: ["viendrait"], t: "conditionnel_present", ipa: "vjɛ̃.dʁɛ", n: "a promis(과거) 시점에서 본 le lendemain의 일, 곧 과거 속의 미래라 조건법 현재예요. venir 어간은 viendr-." },
    { id: 94, v: "savoir", s: "Si on me demandait mon avis, je ne ___ pas quoi répondre.", a: ["saurais"], t: "conditionnel_present", ipa: "so.ʁɛ", n: "si + 반과거(demandait) ↔ 조건법 현재예요. savoir의 조건법 어간은 saur-." },
    { id: 95, v: "voir", s: "Si tu habitais plus près, nous nous ___ plus souvent.", a: ["verrions"], t: "conditionnel_present", ipa: "vɛ.ʁjɔ̃", n: "si + 반과거(habitais) ↔ 조건법 현재예요. voir 어간 verr- + -ions (상호적 대명동사 se voir)." },
    { id: 96, v: "finir", s: "Si tu m'aidais, je ___ ce travail en une heure.", a: ["finirais"], t: "conditionnel_present", ipa: "fi.ni.ʁɛ", n: "si + 반과거(aidais) ↔ 조건법 현재예요. 규칙 동사는 부정사 finir가 그대로 어간." },
    { id: 97, v: "s'ennuyer", s: "Si tu partais, je m'___ terriblement.", a: ["ennuierais"], t: "conditionnel_present", ipa: "ɑ̃.nɥi.ʁɛ", n: "si + 반과거(partais) ↔ 조건법 현재예요. -uyer 동사는 묵음 e 앞에서 y → i: ennuierais." },
    { id: 98, v: "prendre", s: "Si le métro était en grève demain, nous ___ le vélo.", a: ["prendrions"], t: "conditionnel_present", ipa: "pʁɑ̃.dʁi.jɔ̃", n: "si + 반과거(était) ↔ 조건법 현재예요. prendr- + -ions이고, 자음 + r 뒤라 -ions은 [i.jɔ̃]으로 발음해요." },
    { id: 99, v: "venir", s: "Si tu nous invitais, nous ___ avec plaisir.", a: ["viendrions"], t: "conditionnel_present", ipa: "vjɛ̃.dʁi.jɔ̃", n: "si + 반과거(invitais) ↔ 조건법 현재예요. viendr- + -ions." },
    { id: 100, v: "se sentir", s: "Si tu faisais du sport, tu ___ mieux.", a: ["te sentirais"], t: "conditionnel_present", ipa: "tə.sɑ̃.ti.ʁɛ", n: "si + 반과거(faisais) ↔ 조건법 현재예요. 재귀대명사는 tu에 맞춰 te." },
    { id: 101, v: "falloir", s: "Si nous voulions arriver à l'heure, il ___ partir maintenant.", a: ["faudrait"], t: "conditionnel_present", ipa: "fo.dʁɛ", n: "si + 반과거(voulions) ↔ 조건법 현재예요. falloir는 비인칭 il로만 쓰고 조건법 어간은 faudr-." },
    { id: 102, v: "dire", s: "Je savais que tu ___ oui !", a: ["dirais"], t: "conditionnel_present", ipa: "di.ʁɛ", n: "savais(과거) 시점에서 앞으로 일어날 일, 곧 과거 속의 미래예요. dire 어간은 dir-." },

    // ---------- conditionnel passé ----------
    { id: 103, v: "venir", s: "Si tu m'avais appelé, je ___ tout de suite.", a: ["serais venu", "serais venue"], t: "conditionnel_passe", ipa: "sə.ʁɛ.və.ny", n: "si + 대과거(avais appelé) ↔ 조건법 과거: 과거 사실의 반대예요. je의 성별을 알 수 없어 venu와 venue 모두 정답." },
    { id: 104, v: "réussir", s: "Si elle avait travaillé davantage, elle ___ son examen.", a: ["aurait réussi"], t: "conditionnel_passe", ipa: "o.ʁɛ.ʁe.y.si", n: "si + 대과거(avait travaillé) ↔ 조건법 과거예요. avoir 조건법 + réussi." },
    { id: 105, v: "partir", s: "Sans cette grève, nous ___ en vacances hier comme prévu.", a: ["serions partis", "serions parties"], t: "conditionnel_passe", ipa: "sə.ʁjɔ̃.paʁ.ti", n: "sans cette grève(가정) + hier comme prévu(과거)라 조건법 과거예요. nous의 성별을 알 수 없어 두 형태 모두 정답." },
    { id: 106, v: "pouvoir", s: "Si j'avais su, j'___ t'aider.", a: ["aurais pu"], t: "conditionnel_passe", ipa: "o.ʁɛ.py", n: "si + 대과거(avais su) ↔ 조건법 과거예요. pouvoir의 과거분사는 pu." },
    { id: 107, v: "prendre", s: "À ta place, j'___ le train plutôt que l'avion : ça aurait été plus rapide.", a: ["aurais pris"], t: "conditionnel_passe", ipa: "o.ʁɛ.pʁi", n: "à ta place(가정)에 뒤의 ça aurait été(조건법 과거)가 짝을 이뤄요. prendre의 과거분사는 pris." },
    { id: 108, v: "faire", s: "Qu'est-ce que tu ___ à ma place, la semaine dernière ?", a: ["aurais fait"], t: "conditionnel_passe", ipa: "o.ʁɛ.fɛ", n: "à ma place(가정) + la semaine dernière(과거)라 조건법 과거예요." },
    { id: 109, v: "rater", s: "Sans ton aide, j'___ l'examen de la semaine dernière.", a: ["aurais raté"], t: "conditionnel_passe", ipa: "o.ʁɛ.ʁa.te", n: "sans ton aide(가정) + la semaine dernière(과거)라 조건법 과거예요." },
    { id: 110, v: "se placer", s: "Si les spectateurs étaient arrivés plus tôt, ils ___ au premier rang.", a: ["se seraient placés"], t: "conditionnel_passe", ipa: "sə.sə.ʁɛ.pla.se", n: "si + 대과거 ↔ 조건법 과거예요. 대명동사라 être 조동사, 주어 ils에 맞춰 placés." },
    { id: 111, v: "gagner", s: "Avec un peu plus de chance, notre équipe ___ le match d'hier.", a: ["aurait gagné"], t: "conditionnel_passe", ipa: "o.ʁɛ.ɡa.ɲe", n: "avec un peu plus de chance(가정) + le match d'hier(과거)라 조건법 과거예요." },
    { id: 112, v: "rire", s: "Si tu avais vu sa tête, tu ___ aux larmes !", a: ["aurais ri"], t: "conditionnel_passe", ipa: "o.ʁɛ.ʁi", n: "si + 대과거(avais vu) ↔ 조건법 과거예요. rire의 과거분사는 ri." },
    { id: 113, v: "rester", s: "S'il avait plu dimanche, les enfants ___ à la maison.", a: ["seraient restés"], t: "conditionnel_passe", ipa: "sə.ʁɛ.ʁɛs.te", n: "si + 대과거(avait plu) ↔ 조건법 과거예요. rester는 être 조동사, 주어 les enfants에 맞춰 restés." },
    { id: 114, v: "proposer", s: "Je ne savais pas que tu étais en ville, sinon je t'___ de dîner ensemble.", a: ["aurais proposé"], t: "conditionnel_passe", ipa: "o.ʁɛ.pʁɔ.po.ze", n: "sinon(그렇지 않았다면)이 과거 사실의 반대 가정을 이끌어요. 간접목적어 t'에는 일치하지 않아요." },
    { id: 115, v: "vendre", s: "Si on nous avait offert un meilleur prix, nous ___ la maison.", a: ["aurions vendu"], t: "conditionnel_passe", ipa: "o.ʁjɔ̃.vɑ̃.dy", n: "si + 대과거(avait offert) ↔ 조건법 과거예요. vendre의 과거분사는 vendu." },
    { id: 116, v: "rentrer", s: "Si j'avais su que le bus ne passait plus, je ___ à pied plus tôt.", a: ["serais rentré", "serais rentrée"], t: "conditionnel_passe", ipa: "sə.ʁɛ.ʁɑ̃.tʁe", n: "si + 대과거(avais su) ↔ 조건법 과거예요. rentrer는 être 조동사이고 je의 성별을 알 수 없어 두 형태 모두 정답." },
    { id: 117, v: "dire", s: "Si vous m'aviez demandé, je vous ___ la vérité.", a: ["aurais dit"], t: "conditionnel_passe", ipa: "o.ʁɛ.di", n: "si + 대과거(aviez demandé) ↔ 조건법 과거예요. dire의 과거분사는 dit." },
    { id: 118, v: "se régaler", s: "Si tu étais venu au restaurant hier, tu ___.", a: ["te serais régalé"], t: "conditionnel_passe", ipa: "tə.sə.ʁɛ.ʁe.ɡa.le", n: "si + 대과거 ↔ 조건법 과거예요. si절의 venu로 tu가 남성임을 알 수 있어 régalé." },
    { id: 119, v: "voir", s: "Si nous étions partis plus tôt, nous ___ le lever du soleil.", a: ["aurions vu"], t: "conditionnel_passe", ipa: "o.ʁjɔ̃.vy", n: "si + 대과거(étions partis) ↔ 조건법 과거예요. voir의 과거분사는 vu." },

    // ---------- subjonctif présent ----------
    { id: 120, v: "être", s: "Il faut que tu ___ à l'heure demain matin.", a: ["sois"], t: "subjonctif_present", ipa: "swa", n: "il faut que는 접속법을 요구해요. être 접속법: que je sois, que tu sois." },
    { id: 121, v: "avoir", s: "Je veux que vous ___ confiance en vous.", a: ["ayez"], t: "subjonctif_present", ipa: "ɛ.je", n: "vouloir que(바람) 뒤에는 접속법이에요. avoir 접속법 vous 형은 i 없이 ayez." },
    { id: 122, v: "faire", s: "Il faut que nous ___ les courses avant ce soir.", a: ["fassions"], t: "subjonctif_present", ipa: "fa.sjɔ̃", n: "il faut que + 접속법이에요. faire의 접속법 어간은 불규칙형 fass-." },
    { id: 123, v: "aller", s: "Il est temps que tu ___ te coucher.", a: ["ailles"], t: "subjonctif_present", ipa: "aj", n: "il est temps que + 접속법이에요. aller 접속법: que j'aille, que tu ailles (nous/vous는 allions, alliez)." },
    { id: 124, v: "pouvoir", s: "Je parle lentement pour que tout le monde ___ comprendre.", a: ["puisse"], t: "subjonctif_present", ipa: "pɥis", n: "목적을 나타내는 pour que 뒤에는 접속법이에요. pouvoir의 접속법 어간은 puiss-." },
    { id: 125, v: "savoir", s: "Il est important que vous ___ la vérité.", a: ["sachiez"], t: "subjonctif_present", ipa: "sa.ʃje", n: "il est important que + 접속법이에요. savoir의 접속법 어간은 sach-." },
    { id: 126, v: "venir", s: "Range ta chambre avant que tes grands-parents ___ dîner.", a: ["viennent"], t: "subjonctif_present", ipa: "vjɛn", n: "avant que는 접속법을 요구해요. venir 접속법 3인칭 복수는 viennent." },
    { id: 127, v: "vouloir", s: "Je doute qu'il ___ nous aider.", a: ["veuille"], t: "subjonctif_present", ipa: "vœj", n: "douter que(의심) 뒤에는 접속법이에요. vouloir 접속법은 veuille (nous/vous는 voulions, vouliez)." },
    { id: 128, v: "prendre", s: "Il faut que vous ___ ce médicament trois fois par jour.", a: ["preniez"], t: "subjonctif_present", ipa: "pʁə.nje", n: "il faut que + 접속법이에요. nous/vous 형은 반과거와 같은 preniez, 나머지 인칭은 prenn- (que je prenne)." },
    { id: 129, v: "finir", s: "Il faut que je ___ ce rapport avant midi.", a: ["finisse"], t: "subjonctif_present", ipa: "fi.nis", n: "il faut que + 접속법이에요. 2군 동사 접속법은 -iss- + 어미: que je finisse." },
    { id: 130, v: "dire", s: "Il faut que tu me ___ la vérité.", a: ["dises"], t: "subjonctif_present", ipa: "diz", n: "il faut que + 접속법이에요. dire의 접속법 어간은 dis-: que tu dises." },
    { id: 131, v: "boire", s: "Le médecin veut que je ___ plus d'eau.", a: ["boive"], t: "subjonctif_present", ipa: "bwav", n: "vouloir que + 접속법이에요. boire 접속법: que je boive, que nous buvions." },
    { id: 132, v: "se dépêcher", s: "Il faut que nous ___, le film commence dans cinq minutes.", a: ["nous dépêchions"], t: "subjonctif_present", ipa: "nu.de.pɛ.ʃjɔ̃", n: "il faut que + 접속법이에요. 직설법 nous dépêchons과 달리 접속법은 -ions: nous dépêchions." },
    { id: 133, v: "partir", s: "Je ne veux pas que tu ___ si tôt.", a: ["partes"], t: "subjonctif_present", ipa: "paʁt", n: "ne pas vouloir que + 접속법이에요. partir의 접속법 어간은 part-: que tu partes." },
    { id: 134, v: "voir", s: "Bien qu'il ___ mal sans ses lunettes, il refuse de les porter.", a: ["voie"], t: "subjonctif_present", ipa: "vwa", n: "양보의 bien que 뒤에는 접속법이에요. voir 접속법: que je voie, qu'il voie." },
    { id: 135, v: "recevoir", s: "Il faut que les candidats ___ leur convocation avant lundi.", a: ["reçoivent"], t: "subjonctif_present", ipa: "ʁə.swav", n: "il faut que + 접속법이에요. recevoir 접속법 3인칭 복수는 reçoivent (o 앞이라 ç)." },
    { id: 136, v: "écrire", s: "Ma mère aimerait que je lui ___ plus souvent.", a: ["écrive"], t: "subjonctif_present", ipa: "e.kʁiv", n: "aimer que(바람) 뒤에는 접속법이에요. 주절이 조건법이어도 현대 프랑스어는 접속법 현재를 써요. écrire의 접속법 어간은 écriv-." },

    // ---------- impératif ----------
    { id: 137, v: "fermer", s: "___ la fenêtre, s'il te plaît : il fait froid.", a: ["ferme"], t: "imperatif", ipa: "fɛʁm", n: "주어 없이 시작하고 s'il te plaît가 붙은 tu 명령이에요. 1군 동사의 tu 명령형은 s 없이 ferme." },
    { id: 138, v: "être", s: "___ sages pendant mon absence, les enfants !", a: ["soyez"], t: "imperatif", ipa: "swa.je", n: "les enfants(복수)에게 하는 명령이라 vous 형이에요. être 명령형: sois, soyons, soyez." },
    { id: 139, v: "avoir", s: "N'___ pas peur, mon petit : ce chien est très gentil.", a: ["aie"], t: "imperatif", ipa: "ɛ", n: "mon petit(tu)에게 하는 부정 명령이에요. avoir 명령형: aie, ayons, ayez." },
    { id: 140, v: "aller", s: "___ chercher du pain, s'il te plaît !", a: ["va"], t: "imperatif", ipa: "va", n: "s'il te plaît가 붙은 tu 명령이에요. aller의 tu 명령형은 s 없이 va." },
    { id: 141, v: "se lever", s: "___, tu vas être en retard à l'école !", a: ["lève-toi"], t: "imperatif", ipa: "lɛv.twa", n: "tu에게 하는 명령이에요(tu vas). 긍정 명령에서 재귀대명사는 동사 뒤에 붙임표로 붙고 te → toi." },
    { id: 142, v: "s'asseoir", s: "___, je vous en prie, monsieur.", a: ["asseyez-vous", "assoyez-vous"], t: "imperatif", ipa: "a.sɛ.je.vu", n: "monsieur, je vous en prie로 vous 명령이에요. asseyez-vous가 일반적이고 assoyez-vous도 허용돼요." },
    { id: 143, v: "s'inquiéter", s: "Ne ___ pas, maman, je rentrerai avant minuit.", a: ["t'inquiète"], t: "imperatif", ipa: "tɛ̃.kjɛt", n: "maman에게 하는 tu 부정 명령이에요. 부정 명령에서는 재귀대명사가 동사 앞에 와요: ne t'inquiète pas." },
    { id: 144, v: "savoir", s: "___ que je serai toujours là pour toi.", a: ["sache"], t: "imperatif", ipa: "saʃ", n: "pour toi로 보아 tu 명령이에요. savoir 명령형은 접속법에서 와요: sache, sachons, sachez." },
    { id: 145, v: "vouloir", s: "___ patienter quelques minutes, madame.", a: ["veuillez"], t: "imperatif", ipa: "vœ.je", n: "madame에게 하는 정중한 요청이에요. vouloir의 vous 명령형 veuillez는 공손한 표현에 주로 쓰여요." },
    { id: 146, v: "faire", s: "Nous avons tous faim : ___ une pause pour manger quelque chose !", a: ["faisons"], t: "imperatif", ipa: "fə.zɔ̃", n: "nous avons tous faim → 화자를 포함한 nous 명령(~하자)이에요. faire의 nous 명령형 faisons는 [fə.zɔ̃]." },
    { id: 147, v: "s'arrêter", s: "Nous sommes épuisés : ___ un moment, puis nous repartirons.", a: ["arrêtons-nous"], t: "imperatif", ipa: "a.ʁɛ.tɔ̃.nu", n: "nous sommes épuisés, nous repartirons → nous 명령이에요. 대명동사 긍정 명령: arrêtons-nous." },
    { id: 148, v: "prendre", s: "___ un parapluie, monsieur, il va pleuvoir.", a: ["prenez"], t: "imperatif", ipa: "pʁə.ne", n: "monsieur에게 하는 vous 명령이에요. prendre: prends, prenons, prenez." },
    { id: 149, v: "venir", s: "___ ici tout de suite, Léo !", a: ["viens"], t: "imperatif", ipa: "vjɛ̃", n: "Léo(tu)에게 하는 명령이에요. venir의 tu 명령형은 viens." },
    { id: 150, v: "dire", s: "___ bonjour à ta grand-mère de ma part !", a: ["dis"], t: "imperatif", ipa: "di", n: "ta grand-mère로 보아 tu 명령이에요. dire: dis, disons, dites." },
    { id: 151, v: "se taire", s: "___, les enfants, le film commence !", a: ["taisez-vous"], t: "imperatif", ipa: "tɛ.ze.vu", n: "les enfants → vous 명령이에요. se taire 명령형: tais-toi, taisons-nous, taisez-vous." },
    { id: 152, v: "attendre", s: "Ne pars pas sans moi ! ___ cinq minutes, j'arrive.", a: ["attends"], t: "imperatif", ipa: "a.tɑ̃", n: "앞의 ne pars pas(tu 명령)와 같은 상대예요. -re 동사의 tu 명령형은 s를 유지해요: attends." },
    { id: 153, v: "s'amuser", s: "Bonnes vacances, les enfants ! ___ bien !", a: ["amusez-vous"], t: "imperatif", ipa: "a.my.ze.vu", n: "les enfants → vous 명령이에요. 대명동사 긍정 명령: amusez-vous." }
  ]
};

if (typeof module !== "undefined") module.exports = CONJUGLE;
