export const TESTS_LIST = [
  {
    id: 1,
    imageSrc: "/img/main/test1.png",
    imageAlt: "Какой вы тип путешественника?",
    title: "Какой вы тип путешественника?",
    description: "В легкой форме по вашим привычкам узнаем какой у вас стиль действий",
    readTime: "3 минуты",
  },
  {
    id: 2,
    imageSrc: "/img/main/test2.png",
    imageAlt: "Насколько вы готовы к неожиданностям в поездке?",
    title: "Насколько вы готовы к неожиданностям в поездке?",
    description: "Этот тест покажет, насколько ваш чек-план устойчив к сюрпризам",
    readTime: "2 минуты",
  },
  {
    id: 3,
    imageSrc: "/img/main/test3.png",
    imageAlt: "Что для вас главное в путешествии?",
    title: "Что для вас главное в путешествии?",
    description:
      "Ответьте честно — и мы угадаем, в чем ваш кайф от путешествий",
    readTime: "2 минуты",
  },
];

const TRAVELER_RESULTS = [
  {
    id: "calm-planner",
    title: "Спокойный собиратель!",
    description:
      "Вы не просто готовитесь — вы создаете ритуал. Для вас подготовка — часть предвкушения. Всё продумано, ничего не упущено.",
  },
  {
    id: "fast-starter",
    title: "Быстрый импровизатор!",
    description:
      "Вы легко решаете на ходу и не тратите лишнее время на сборы. Главное взять базу, а остальное вы найдете по пути.",
  },
  {
    id: "team-organizer",
    title: "Координатор команды!",
    description:
      "Вы думаете не только о себе, но и о спутниках. Вам важно, чтобы у всех все было на месте и поездка прошла спокойно.",
  },
];

const TEST_1_RESULTS = [
  {
    id: "calm-collector",
    title: "Спокойный собиратель",
    description:
      "Вы не просто готовитесь — вы создаёте ритуал. Для вас подготовка — часть предвкушения. Всё продумано, ничего не упущено.",
  },
  {
    id: "impulsive-explorer",
    title: "Импульсивный исследователь",
    description:
      "Вы доверяете себе и моменту. Готовитесь быстро, но интуитивно точно. Главное — не терять ритм.",
  },
  {
    id: "minimalist-with-checklist",
    title: "Минималист с чек-листом",
    description:
      "Вы знаете: меньше — значит свободнее. Берёте только то, что проверено опытом. Остальное — лишнее.",
  },
  {
    id: "caring-organizer",
    title: "Заботливый организатор",
    description:
      "Вы думаете не только о себе. Ваша суперсила — организовать других, чтобы все чувствовали себя спокойно.",
  },
];

const TEST_2_RESULTS = [
  {
    id: "strategist-with-buffer",
    title: "Стратег с запасом",
    description:
      "Вы верите в подготовку как страховку. У вас всегда есть план Б — и даже В. Это не тревога, а уверенность.",
  },
  {
    id: "trusting-the-flow",
    title: "Доверяющий потоку",
    description:
      "Вы не боретесь с неожиданностями — вы включаете их в путешествие. Главное — сохранять спокойствие.",
  },
  {
    id: "vigilant-newbie",
    title: "Бдительный новичок",
    description:
      "Вы стараетесь, но ещё не выработали свой ритуал. Это нормально — каждый начинал с тревоги.",
  },
  {
    id: "minimalist-realist",
    title: "Минималист-реалист",
    description:
      "Вы отсекаете лишнее — даже страх. Всё, что не пригодилось в прошлых поездках, не берёте.",
  },
];

const TEST_3_RESULTS = [
  {
    id: "impressions-seeker",
    title: "Искатель впечатлений",
    description:
      "Вы едете, чтобы увидеть, понять, запомнить. Для вас важно не упустить ключевые точки.",
  },
  {
    id: "peace-seeker",
    title: "Искатель покоя",
    description:
      "Вы едете, чтобы остановиться. Главное — минимум тревог, максимум тишины.",
  },
  {
    id: "connection-seeker",
    title: "Искатель связи",
    description:
      "Вы едете, чтобы почувствовать место через людей. Локальные кафе, рынки, разговоры — ваше всё.",
  },
  {
    id: "freedom-seeker",
    title: "Искатель свободы",
    description:
      "Вы едете, чтобы освободиться от рутины. План — только чтобы не думать о документах.",
  },
];

export const TEST_DETAILS = {
  1: {
    id: 1,
    imageSrc: "/img/main/test1.png",
    imageAlt: "Какой вы тип путешественника?",
    title: "Какой вы тип путешественника?",
    description:
      "В легкой форме по вашим привычкам узнаем какой у вас стиль действий",
    readTime: "3 минуты",
    questions: [
      {
        id: "q1",
        title: "Как вы обычно начинаете собираться?",
        options: [
          {
            text: "За неделю: составляю список, уточняю детали, проверяю погоду",
            resultId: "calm-collector",
            score: 1,
          },
          {
            text: "За день: быстро пробегаюсь по памяти и набрасываю самое нужное",
            resultId: "impulsive-explorer",
            score: 1,
          },
          {
            text: "За пару часов: «главное — билеты и паспорт, остальное найду»",
            resultId: "minimalist-with-checklist",
            score: 1,
          },
          {
            text: "Сразу думаю: «а что нужно тем, с кем еду?»",
            resultId: "caring-organizer",
            score: 1,
          },
        ],
      },
      {
        id: "q2",
        title: "Что для вас важнее всего в подготовке?",
        options: [
          {
            text: "Чтобы всё было продумано заранее",
            resultId: "calm-collector",
            score: 1,
          },
          {
            text: "Чтобы не тратить много времени",
            resultId: "impulsive-explorer",
            score: 1,
          },
          {
            text: "Чтобы взять минимум, но самое нужное",
            resultId: "minimalist-with-checklist",
            score: 1,
          },
          {
            text: "Чтобы никто из попутчиков ничего не забыл",
            resultId: "caring-organizer",
            score: 1,
          },
        ],
      },
      {
        id: "q3",
        title: "Как вы относитесь к чужим чек-листам?",
        options: [
          {
            text: "Использую как основу, но всегда адаптирую",
            resultId: "calm-collector",
            score: 1,
          },
          {
            text: "Смотрю, если совсем не знаю, куда еду",
            resultId: "impulsive-explorer",
            score: 1,
          },
          {
            text: "Редко смотрю — у меня свой ритуал",
            resultId: "minimalist-with-checklist",
            score: 1,
          },
          {
            text: "Ищу те, где есть раздел «для всей компании»",
            resultId: "caring-organizer",
            score: 1,
          },
        ],
      },
      {
        id: "q4",
        title: "Как вы реагируете, если в поездке случается непредвиденная задержка?",
        options: [
          {
            text: "Спокойно, ведь я подготовился к таким ситуациям",
            resultId: "calm-collector",
            score: 1,
          },
          {
            text: "Нервничаю, но быстро ищу решение",
            resultId: "impulsive-explorer",
            score: 1,
          },
          {
            text: "Игнорирую, потому что это не важно",
            resultId: "minimalist-with-checklist",
            score: 1,
          },
          {
            text: "Сразу звоню всем, кто может помочь",
            resultId: "caring-organizer",
            score: 1,
          },
        ],
      },
      {
        id: "q5",
        title: "Как вы планируете время в поездке?",
        options: [
          {
            text: "По строгому графику: «в 10:00 — музей, в 14:00 — обед»",
            resultId: "calm-collector",
            score: 1,
          },
          {
            text: "С гибким расписанием, но с основными точками",
            resultId: "impulsive-explorer",
            score: 1,
          },
          {
            text: "Без плана, спонтанно, по настроению",
            resultId: "minimalist-with-checklist",
            score: 1,
          },
          {
            text: "По рекомендациям местных, чтобы не пропустить важное",
            resultId: "caring-organizer",
            score: 1,
          },
        ],
      },
      {
        id: "q6",
        title: "Как вы проверяете готовность перед выездом?",
        options: [
          {
            text: "Прогоняю по чек-листу 2–3 раза",
            resultId: "calm-collector",
            score: 1,
          },
          {
            text: "Быстро пробегаюсь глазами, доверяю интуиции",
            resultId: "impulsive-explorer",
            score: 1,
          },
          {
            text: "Проверяю только документы и билеты",
            resultId: "minimalist-with-checklist",
            score: 1,
          },
          {
            text: "Спрашиваю у всех, всё ли они взяли",
            resultId: "caring-organizer",
            score: 1,
          },
        ],
      },
    ],
    // При равенстве выбор в пользу нейтрального результата.
    results: TEST_1_RESULTS,
    cta: {
      title: "Попробуй наши шаблоны для поездок",
      description:
        "Практично, удобно, а ещё мы предусмотрели все важные пункты, тебе осталось только скопировать и настроить под себя",
      imageSrc: "/img/main/article3.webp",
      imageAlt: "Шаблоны для поездок",
      buttonText: "Использовать",
    },
  },
  2: {
    id: 2,
    imageSrc: "/img/main/test2.png",
    imageAlt: "Насколько вы готовы к неожиданностям в поездке?",
    title: "Насколько вы готовы к неожиданностям в поездке?",
    description:
      "Этот тест покажет, насколько ваш чек-план устойчив к сюрпризам",
    readTime: "2 минуты",
    questions: [
      {
        id: "q1",
        title: "Что вы делаете, если в поездке пропадает интернет?",
        options: [
          {
            text: "Ничего — у меня всё сохранено офлайн",
            resultId: "strategist-with-buffer",
            score: 1,
          },
          {
            text: "Нервничаю, но нахожу выход",
            resultId: "vigilant-newbie",
            score: 1,
          },
          {
            text: "Стараюсь этого не допускать — беру распечатки",
            resultId: "minimalist-realist",
            score: 1,
          },
          {
            text: "Зависит от ситуации — иногда это даже к лучшему",
            resultId: "trusting-the-flow",
            score: 1,
          },
        ],
      },
      {
        id: "q2",
        title: "Берёте ли вы что-то “на всякий случай”?",
        options: [
          {
            text: "Да, всегда: адаптер, power bank, копия документов",
            resultId: "strategist-with-buffer",
            score: 1,
          },
          {
            text: "Только самое важное",
            resultId: "vigilant-newbie",
            score: 1,
          },
          {
            text: "Нет, если не использовал за год — не беру",
            resultId: "minimalist-realist",
            score: 1,
          },
          {
            text: "Да, но только если еду с другими",
            resultId: "trusting-the-flow",
            score: 1,
          },
        ],
      },
      {
        id: "q3",
        title: "Как вы относитесь к “резервным” вариантам (отель, маршрут, билет)?",
        options: [
          {
            text: "Всегда продумываю запасной план",
            resultId: "strategist-with-buffer",
            score: 1,
          },
          {
            text: "Иногда — если поездка важная",
            resultId: "vigilant-newbie",
            score: 1,
          },
          {
            text: "Почти никогда",
            resultId: "minimalist-realist",
            score: 1,
          },
          {
            text: "Думаю о них, но не записываю",
            resultId: "trusting-the-flow",
            score: 1,
          },
        ],
      },
      {
        id: "q4",
        title: "Что вас больше всего тревожит перед поездкой?",
        options: [
          {
            text: "Что что-то забуду или потеряю",
            resultId: "strategist-with-buffer",
            score: 1,
          },
          {
            text: "Что не успею",
            resultId: "vigilant-newbie",
            score: 1,
          },
          {
            text: "Что возьму лишнее",
            resultId: "minimalist-realist",
            score: 1,
          },
          {
            text: "Что кто-то из компании будет не готов",
            resultId: "trusting-the-flow",
            score: 1,
          },
        ],
      },
    ],
    results: TEST_2_RESULTS,
    resultRules: {
      minScore: 3,
      tieBreakResultId: "vigilant-newbie",
    },
    cta: {
      title: "Попробуй наши шаблоны для поездок",
      description:
        "Практично, удобно, а ещё мы предусмотрели все важные пункты, тебе осталось только скопировать и настроить под себя",
      imageSrc: "/img/main/article3.webp",
      imageAlt: "Шаблоны для поездок",
      buttonText: "Использовать",
    },
  },
  3: {
    id: 3,
    imageSrc: "/img/main/test3.png",
    imageAlt: "Что для вас главное в путешествии?",
    title: "Что для вас главное в путешествии?",
    description:
      "Ответьте честно — и мы угадаем, в чем ваш кайф от путешествий",
    readTime: "2 минуты",
    questions: [
      {
        id: "q1",
        title: "Что вы вспоминаете в первую очередь после поездки?",
        options: [
          {
            text: "Виды, музеи, архитектуру",
            resultId: "impressions-seeker",
            score: 1,
          },
          {
            text: "Ощущение покоя, сна без будильника",
            resultId: "peace-seeker",
            score: 1,
          },
          {
            text: "Новые знакомства, разговоры, местные рынки",
            resultId: "connection-seeker",
            score: 1,
          },
          {
            text: "Свободу: никуда не спешить, решать всё на ходу",
            resultId: "freedom-seeker",
            score: 1,
          },
        ],
      },
      {
        id: "q2",
        title: "Как вы выбираете место для поездки?",
        options: [
          {
            text: "По интересным локациям и маршрутам",
            resultId: "impressions-seeker",
            score: 1,
          },
          {
            text: "По возможности отдохнуть без суеты",
            resultId: "peace-seeker",
            score: 1,
          },
          {
            text: "По отзывам и рекомендациям людей",
            resultId: "connection-seeker",
            score: 1,
          },
          {
            text: "По ощущению: “хочу туда — и всё”",
            resultId: "freedom-seeker",
            score: 1,
          },
        ],
      },
      {
        id: "q3",
        title: "Что сделает поездку удачной?",
        options: [
          {
            text: "Увидеть всё, что запланировал",
            resultId: "impressions-seeker",
            score: 1,
          },
          {
            text: "Вернуться отдохнувшим",
            resultId: "peace-seeker",
            score: 1,
          },
          {
            text: "Почувствовать себя “своим” в новом месте",
            resultId: "connection-seeker",
            score: 1,
          },
          {
            text: "Не думать о расписании и “обязаловках”",
            resultId: "freedom-seeker",
            score: 1,
          },
        ],
      },
      {
        id: "q4",
        title: "Как вы планируете своё время в поездке?",
        options: [
          {
            text: "По строгому графику: «в 10:00 — музей, в 14:00 — обед»",
            resultId: "impressions-seeker",
            score: 1,
          },
          {
            text: "С гибким расписанием, но с основными точками",
            resultId: "peace-seeker",
            score: 1,
          },
          {
            text: "Без плана, спонтанно, по настроению",
            resultId: "connection-seeker",
            score: 1,
          },
          {
            text: "По рекомендациям местных, чтобы не пропустить важное",
            resultId: "freedom-seeker",
            score: 1,
          },
        ],
      },
      {
        id: "q5",
        title: "Что для вас важнее в поездке?",
        options: [
          {
            text: "Посетить как можно больше достопримечательностей",
            resultId: "impressions-seeker",
            score: 1,
          },
          {
            text: "Отдыхать и восстанавливать силы",
            resultId: "peace-seeker",
            score: 1,
          },
          {
            text: "Знакомиться с людьми и их культурой",
            resultId: "connection-seeker",
            score: 1,
          },
          {
            text: "Путешествовать без конкретных целей",
            resultId: "freedom-seeker",
            score: 1,
          },
        ],
      },
      {
        id: "q6",
        title: "Как вы реагируете на непредвиденные изменения в планах?",
        options: [
          {
            text: "Нервничаю, но быстро нахожу альтернативу",
            resultId: "impressions-seeker",
            score: 1,
          },
          {
            text: "Расслабляюсь, ведь это часть приключения",
            resultId: "peace-seeker",
            score: 1,
          },
          {
            text: "Обращаюсь к местным за советом",
            resultId: "connection-seeker",
            score: 1,
          },
          {
            text: "Просто иду по течению",
            resultId: "freedom-seeker",
            score: 1,
          },
        ],
      },
    ],
    results: TEST_3_RESULTS,
    resultRules: {
      minScore: 2,
      tieBreakResultId: "impressions-seeker",
    },
    cta: {
      title: "Попробуй наши шаблоны для поездок",
      description:
        "Практично, удобно, а ещё мы предусмотрели все важные пункты, тебе осталось только скопировать и настроить под себя",
      imageSrc: "/img/main/article3.webp",
      imageAlt: "Шаблоны для поездок",
      buttonText: "Использовать",
    },
  },
};

export function getTestById(testId) {
  const parsed = Number(testId);
  if (!Number.isFinite(parsed)) return null;
  const listItem = TESTS_LIST.find((test) => test.id === parsed);
  if (!listItem) return null;
  return TEST_DETAILS[parsed] ?? { ...listItem, questions: [], results: [] };
}
