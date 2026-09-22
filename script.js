document.addEventListener("DOMContentLoaded", () => {

  const state = {
    turn: 1,
    maxTurns: 20,
    money: 1200,

    metrics: {
      happiness: 60,
      ecology: 55,
      mobility: 50,
      education: 45,
      health: 50,
      economy: 55
    },

    population: 120000,
    projects: {},

    news: [
      "Город просыпается. Жители ждут ваших решений.",
      "Акимат получил новый бюджет.",
      "Начинается первый рабочий месяц."
    ],

    started: false,
    eventOpen: false,
    gameOver: false
  };


  /* =========================
     ПРОЕКТЫ
     ========================= */

  const PROJECTS = {

    park: {
      name: "Городской парк",
      icon: "🌳",
      costs: [70, 45, 60],
      income: 2,
      effects: {
        ecology: 7,
        happiness: 6
      },
      position: [115, 330]
    },

    school: {
      name: "Школа",
      icon: "🏫",
      costs: [100, 65, 90],
      income: 1,
      effects: {
        education: 9,
        happiness: 3
      },
      position: [230, 150]
    },

    hospital: {
      name: "Больница",
      icon: "🏥",
      costs: [130, 80, 110],
      income: 1,
      effects: {
        health: 10,
        happiness: 5
      },
      position: [580, 150]
    },

    metro: {
      name: "Метро",
      icon: "🚇",
      costs: [250, 150, 200],
      income: 5,
      effects: {
        mobility: 15,
        economy: 5,
        happiness: 4
      },
      position: [330, 410]
    },

    recycling: {
      name: "Центр переработки",
      icon: "♻️",
      costs: [90, 60, 80],
      income: 3,
      effects: {
        ecology: 12,
        economy: 2
      },
      position: [620, 420]
    },

    solar: {
      name: "Солнечная станция",
      icon: "☀️",
      costs: [180, 110, 150],
      income: 9,
      effects: {
        ecology: 10,
        economy: 7
      },
      position: [700, 300]
    },

    market: {
      name: "Городской рынок",
      icon: "🏪",
      costs: [80, 55, 75],
      income: 12,
      effects: {
        economy: 8,
        happiness: 3
      },
      position: [220, 400]
    },

    housing: {
      name: "Жилой комплекс",
      icon: "🏢",
      costs: [160, 100, 140],
      income: 16,
      effects: {
        economy: 6,
        happiness: 4,
        mobility: -3
      },
      position: [530, 100]
    },

    bike: {
      name: "Велодорожки",
      icon: "🚲",
      costs: [60, 40, 55],
      income: 1,
      effects: {
        mobility: 8,
        ecology: 6,
        health: 3
      },
      position: [410, 500]
    },

    water: {
      name: "Очистная станция",
      icon: "💧",
      costs: [120, 75, 100],
      income: 2,
      effects: {
        ecology: 9,
        health: 8
      },
      position: [690, 500]
    },

    university: {
      name: "Университет",
      icon: "🎓",
      costs: [280, 180, 230],
      income: 10,
      effects: {
        education: 15,
        economy: 10
      },
      position: [90, 180]
    },

    stadium: {
      name: "Стадион",
      icon: "🏟️",
      costs: [200, 120, 160],
      income: 10,
      effects: {
        happiness: 9,
        health: 5,
        economy: 5
      },
      position: [500, 520]
    },

    tourism: {
      name: "Туристический центр",
      icon: "🏨",
      costs: [220, 140, 190],
      income: 20,
      effects: {
        economy: 14,
        happiness: 5,
        ecology: -3
      },
      position: [720, 100]
    }

  };


  /* =========================
     СОБЫТИЯ
     ========================= */

  const EVENTS = [

    {
      icon: "🌫️",
      title: "Экологический кризис",
      description:
        "Качество воздуха резко ухудшилось. Жители требуют действий.",

      choices: [

        {
          text: "Выделить 50 млн на очистку",
          cost: 50,

          effects: {
            ecology: 12,
            happiness: 4
          },

          result:
            "Программа очистки воздуха помогла стабилизировать ситуацию."
        },

        {
          text: "Ничего не делать",

          effects: {
            ecology: -12,
            happiness: -6
          },

          result:
            "Проблема продолжила ухудшаться."
        }

      ]
    },


    {
      icon: "🚗",
      title: "Транспортный коллапс",
      description:
        "Утренние пробки парализовали несколько районов.",

      choices: [

        {
          text: "Вложить 70 млн в дороги",
          cost: 70,

          effects: {
            mobility: 12,
            economy: 3
          },

          result:
            "Транспортная ситуация заметно улучшилась."
        },

        {
          text: "Запустить дополнительные автобусы",
          cost: 30,

          effects: {
            mobility: 7,
            happiness: 3
          },

          result:
            "Общественный транспорт частично разгрузил дороги."
        },

        {
          text: "Ничего не делать",

          effects: {
            mobility: -10,
            happiness: -7
          },

          result:
            "Жители провели часы в пробках."
        }

      ]
    },


    {
      icon: "🏥",
      title: "Перегрузка больниц",
      description:
        "Количество пациентов резко выросло.",

      choices: [

        {
          text: "Выделить 60 млн",
          cost: 60,

          effects: {
            health: 12,
            happiness: 5
          },

          result:
            "Больницы получили необходимые ресурсы."
        },

        {
          text: "Ничего не делать",

          effects: {
            health: -12,
            happiness: -8
          },

          result:
            "Медицинская система испытывает серьёзную нагрузку."
        }

      ]
    },


    {
      icon: "🧳",
      title: "Интерес туристов",
      description:
        "Туристы начали проявлять интерес к вашему городу.",

      choices: [

        {
          text: "Инвестировать 40 млн",
          cost: 40,

          effects: {
            economy: 10,
            happiness: 4
          },

          result:
            "Туристический поток значительно вырос."
        },

        {
          text: "Ничего не делать",
          money: 70,

          effects: {
            economy: 3,
            happiness: -5
          },

          result:
            "Город получил быструю прибыль, но упустил возможность развития."
        }

      ]
    },


    {
      icon: "💼",
      title: "Новый инвестор",
      description:
        "Крупная компания предлагает открыть филиал в городе.",

      choices: [

        {
          text: "Предоставить льготы",
          money: 100,

          effects: {
            economy: 12
          },

          result:
            "Компания согласилась инвестировать в город."
        },

        {
          text: "Отказаться",

          effects: {
            economy: -2
          },

          result:
            "Город сохранил текущие условия."
        }

      ]
    },


    {
      icon: "🎉",
      title: "Городской фестиваль",
      description:
        "Организаторы предлагают провести крупный фестиваль.",

      choices: [

        {
          text: "Потратить 35 млн",
          cost: 35,

          effects: {
            happiness: 12,
            economy: 5
          },

          result:
            "Фестиваль стал главным событием месяца."
        },

        {
          text: "Провести небольшой фестиваль",
          cost: 10,

          effects: {
            happiness: 5,
            economy: 2
          },

          result:
            "Небольшой фестиваль прошёл успешно."
        }

      ]
    },


    {
      icon: "📚",
      title: "Проблемы образования",
      description:
        "Школам не хватает современного оборудования.",

      choices: [

        {
          text: "Закупить оборудование",
          cost: 50,

          effects: {
            education: 10
          },

          result:
            "Учебный процесс улучшился."
        },

        {
          text: "Перенести финансирование",

          effects: {
            education: -5,
            economy: 3
          },

          result:
            "Средства были направлены на другие задачи."
        }

      ]
    },


    {
      icon: "🌧️",
      title: "Сильный ливень",
      description:
        "Несколько улиц оказались затоплены.",

      choices: [

        {
          text: "Ремонтировать ливневую систему",
          cost: 60,

          effects: {
            ecology: 5,
            happiness: 6,
            mobility: 7
          },

          result:
            "Ливневая система модернизирована."
        },

        {
          text: "Экстренная уборка",
          cost: 25,

          effects: {
            happiness: 3,
            mobility: 3
          },

          result:
            "Улицы постепенно вернулись в норму."
        }

      ]
    },


    {
      icon: "⚡",
      title: "Энергетический сбой",
      description:
        "Несколько районов столкнулись с перебоями электричества.",

      choices: [

        {
          text: "Ремонтировать сеть",
          cost: 80,

          effects: {
            economy: 7,
            happiness: 5
          },

          result:
            "Энергоснабжение восстановлено."
        },

        {
          text: "Ввести временные ограничения",

          effects: {
            economy: -3,
            happiness: -8
          },

          result:
            "Система работает, но жители недовольны."
        }

      ]
    },


    {
      icon: "🏛️",
      title: "Государственный грант",
      description:
        "Город может получить грант на развитие инфраструктуры.",

      choices: [

        {
          text: "Подать заявку",
          money: 120,

          effects: {
            economy: 5
          },

          result:
            "Город получил дополнительное финансирование."
        },

        {
          text: "Не участвовать",

          effects: {},

          result:
            "Возможность была упущена."
        }

      ]
    }

  ];
    // =========================
  // DOM
  // =========================

  const startScreen = document.getElementById("startScreen");
  const startBtn = document.getElementById("startBtn");

  const projectsContainer = document.getElementById("projects");

  const turnEl = document.getElementById("turn");
  const moneyEl = document.getElementById("money");
  const incomeEl = document.getElementById("incomePerTurn");

  const metricEls = {
    happiness: {
      value: document.getElementById("happinessValue"),
      bar: document.getElementById("happinessBar")
    },
    ecology: {
      value: document.getElementById("ecologyValue"),
      bar: document.getElementById("ecologyBar")
    },
    mobility: {
      value: document.getElementById("mobilityValue"),
      bar: document.getElementById("mobilityBar")
    },
    education: {
      value: document.getElementById("educationValue"),
      bar: document.getElementById("educationBar")
    },
    health: {
      value: document.getElementById("healthValue"),
      bar: document.getElementById("healthBar")
    },
    economy: {
      value: document.getElementById("economyValue"),
      bar: document.getElementById("economyBar")
    }
  };

  const newsTurn = document.getElementById("newsTurn");
  const newsList = document.getElementById("newsList");

  const projectObjects = document.getElementById("projectObjects");

  const eventModal = document.getElementById("eventModal");
  const eventTag = document.getElementById("eventTag");
  const eventIcon = document.getElementById("eventIcon");
  const eventTitle = document.getElementById("eventTitle");
  const eventDescription = document.getElementById("eventDescription");
  const eventChoices = document.getElementById("eventChoices");

  const finishModal = document.getElementById("finishModal");
  const finalScore = document.getElementById("finalScore");
  const finalHappiness = document.getElementById("finalHappiness");
  const finalEcology = document.getElementById("finalEcology");
  const finalEconomy = document.getElementById("finalEconomy");

  const toastEl = document.getElementById("toast");


  // =========================
  // СОХРАНЕНИЕ
  // =========================

  const SAVE_KEY = "merocity-save-v2";


  // =========================
  // ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
  // =========================

  function clamp(value, min = 0, max = 100) {
    return Math.max(min, Math.min(max, value));
  }

  function formatMoney(value) {
    return `${Math.round(value)} млн ₸`;
  }

  function changeMetric(metric, amount) {
    if (!state.metrics.hasOwnProperty(metric)) return;

    state.metrics[metric] = clamp(
      state.metrics[metric] + amount
    );
  }

  function addNews(message) {
    if (!message) return;

    state.news.unshift(message);

    if (state.news.length > 8) {
      state.news.length = 8;
    }
  }

  function showToast(message) {
    if (!toastEl) return;

    toastEl.textContent = message;
    toastEl.classList.add("show");

    clearTimeout(showToast.timer);

    showToast.timer = setTimeout(() => {
      toastEl.classList.remove("show");
    }, 2500);
  }


  // =========================
  // ФИНАНСЫ
  // =========================

  function getIncome() {
    let income = 25;

    Object.entries(state.projects).forEach(([id, level]) => {
      const project = PROJECTS[id];

      if (!project) return;

      income += project.income * level;
    });

    income += Math.floor(state.metrics.economy / 20);

    return Math.max(0, income);
  }

  function getExpenses() {
    let expenses = 12;

    Object.values(state.projects).forEach(level => {
      expenses += level * 2;
    });

    return expenses;
  }


  // =========================
  // ПРОЕКТЫ
  // =========================

  function getProjectLevel(id) {
    return state.projects[id] || 0;
  }

  function getProjectCost(id) {
    const project = PROJECTS[id];

    if (!project) return null;

    const level = getProjectLevel(id);

    if (level >= project.costs.length) {
      return null;
    }

    return project.costs[level];
  }

  function createProjectCards() {
    if (!projectsContainer) return;

    projectsContainer.innerHTML = "";

    Object.entries(PROJECTS).forEach(([id, project]) => {
      const level = getProjectLevel(id);
      const cost = getProjectCost(id);

      const card = document.createElement("div");
      card.className = "project-card";
      card.dataset.project = id;

      const levelText =
        level === 0
          ? "Не построено"
          : `Уровень ${level}`;

      let buttonText = "";

      if (cost === null) {
        buttonText = "МАКСИМУМ";
      } else if (level === 0) {
        buttonText = `ПОСТРОИТЬ · ${cost} млн`;
      } else {
        buttonText = `УЛУЧШИТЬ · ${cost} млн`;
      }

      card.innerHTML = `
        <div class="project-icon">${project.icon}</div>

        <div class="project-info">
          <h3>${project.name}</h3>
          <p>${levelText}</p>
        </div>

        <button
          class="project-btn"
          data-project-id="${id}"
          ${cost === null ? "disabled" : ""}
        >
          ${buttonText}
        </button>
      `;

      projectsContainer.appendChild(card);
    });

    projectsContainer
      .querySelectorAll(".project-btn")
      .forEach(button => {
        button.addEventListener("click", () => {
          const id = button.dataset.project;
          buildProject(id);
        });
      });
  }


  // =========================
  // ПОСТРОЙКА / УЛУЧШЕНИЕ
  // =========================

  function buildProject(id) {
    if (state.gameOver) return;
    if (!state.started) return;
    if (state.eventOpen) return;

    const project = PROJECTS[id];

    if (!project) return;

    const level = getProjectLevel(id);
    const cost = getProjectCost(id);

    if (cost === null) {
      showToast("🏗️ Максимальный уровень");
      return;
    }

    if (state.money < cost) {
      showToast("💸 Недостаточно денег");
      return;
    }

    // Оплата
    state.money -= cost;

    // Новый уровень
    state.projects[id] = level + 1;

    // Эффект проекта
    const multiplier = level === 0 ? 1 : 0.55;

    Object.entries(project.effects).forEach(([metric, value]) => {
      const effect = Math.round(value * multiplier);
      changeMetric(metric, effect);
    });

    const message =
      level === 0
        ? `${project.icon} Построен объект: ${project.name}`
        : `${project.icon} Улучшен объект: ${project.name}`;

    addNews(message);
    showToast(message);

    render();
    updateMap();
    saveGame();

    // Каждая покупка = один ход
    setTimeout(() => {
      nextTurn();
    }, 500);
  }
    // =========================
  // ОБНОВЛЕНИЕ ИНТЕРФЕЙСА
  // =========================

  function updateTurn() {
    if (!turnEl) return;

    const shownTurn = Math.min(state.turn, state.maxTurns);
    turnEl.textContent = `${shownTurn} / ${state.maxTurns}`;
  }

  function updateBudget() {
    if (moneyEl) {
      moneyEl.textContent = formatMoney(state.money);
    }

    if (incomeEl) {
      const income = getIncome();
      const expenses = getExpenses();
      const balance = income - expenses;

      incomeEl.textContent =
        balance >= 0
          ? `+${balance} млн ₸ / ход`
          : `${balance} млн ₸ / ход`;
    }
  }

  function updateMetrics() {
    Object.entries(metricEls).forEach(([metric, elements]) => {
      if (!elements) return;

      const value = Math.round(state.metrics[metric]);

      if (elements.value) {
        elements.value.textContent = `${value}%`;
      }

      if (elements.bar) {
        elements.bar.style.width = `${value}%`;
      }
    });
  }

  function renderNews() {
    if (!newsList) return;

    newsList.innerHTML = "";

    state.news.slice(0, 6).forEach(message => {
      const item = document.createElement("div");

      item.className = "news-item";
      item.textContent = message;

      newsList.appendChild(item);
    });

    if (newsTurn) {
      newsTurn.textContent = `Ход ${Math.min(
        state.turn,
        state.maxTurns
      )}`;
    }
  }


  // =========================
  // КАРТА
  // =========================

  function updateMap() {
    if (!projectObjects) return;

    projectObjects.innerHTML = "";

    Object.entries(state.projects).forEach(([id, level]) => {
      if (level <= 0) return;

      const project = PROJECTS[id];

      if (!project) return;

      const [x, y] = project.position;

      const group = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
      );

      group.setAttribute("class", "project-object");
      group.setAttribute("transform", `translate(${x}, ${y})`);

      const circle = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );

      circle.setAttribute("cx", "0");
      circle.setAttribute("cy", "0");
      circle.setAttribute("r", "24");

      const text = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );

      text.setAttribute("x", "0");
      text.setAttribute("y", "7");
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("font-size", "22");
      text.textContent = project.icon;

      const levelText = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
      );

      levelText.setAttribute("x", "0");
      levelText.setAttribute("y", "42");
      levelText.setAttribute("text-anchor", "middle");
      levelText.setAttribute("font-size", "11");
      levelText.textContent = `ур. ${level}`;

      group.appendChild(circle);
      group.appendChild(text);
      group.appendChild(levelText);

      projectObjects.appendChild(group);
    });
  }


  // =========================
  // ОБЩИЙ РЕНДЕР
  // =========================

  function render() {
    updateTurn();
    updateBudget();
    updateMetrics();
    renderNews();
    createProjectCards();
  }


  // =========================
  // СОБЫТИЯ
  // =========================

  function randomEvent() {
    if (state.gameOver) return;
    if (state.eventOpen) return;

    // Не каждый ход обязательно имеет событие
    const chance = Math.random();

    if (chance > 0.45) {
      return;
    }

    const event =
      EVENTS[Math.floor(Math.random() * EVENTS.length)];

    if (!event) return;

    showEvent(event);
  }

  function showEvent(event) {
    if (!eventModal) return;

    state.eventOpen = true;

    if (eventTag) {
      eventTag.textContent = "СОБЫТИЕ";
    }

    if (eventIcon) {
      eventIcon.textContent = event.icon;
    }

    if (eventTitle) {
      eventTitle.textContent = event.title;
    }

    if (eventDescription) {
      eventDescription.textContent = event.description;
    }

    if (eventChoices) {
      eventChoices.innerHTML = "";

      event.choices.forEach((choice, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "event-choice";

        button.textContent = choice.text;

        button.addEventListener("click", () => {
          chooseEvent(event, index);
        });

        eventChoices.appendChild(button);
      });
    }

    eventModal.classList.add("show");
  }

  function chooseEvent(event, choiceIndex) {
    if (!state.eventOpen) return;

    const choice = event.choices[choiceIndex];

    if (!choice) return;

    // Проверяем стоимость решения
    if (choice.cost && state.money < choice.cost) {
      showToast("💸 Недостаточно денег");
      return;
    }

    if (choice.cost) {
      state.money -= choice.cost;
    }

    // Применяем эффекты
    if (choice.effects) {
      Object.entries(choice.effects).forEach(
        ([metric, value]) => {
          changeMetric(metric, value);
        }
      );
    }

    // Деньги отдельно
    if (choice.money) {
      state.money += choice.money;
    }

    if (choice.news) {
      addNews(choice.news);
    } else {
      addNews(`${event.icon} ${event.title}`);
    }

    closeEvent();

    render();
    updateMap();
    saveGame();
  }

  function closeEvent() {
    state.eventOpen = false;

    if (eventModal) {
      eventModal.classList.remove("show");
    }
  }


  // =========================
  // СЛЕДУЮЩИЙ ХОД
  // =========================

  function nextTurn() {
    if (state.gameOver) return;
    if (!state.started) return;
    if (state.eventOpen) return;

    const income = getIncome();
    const expenses = getExpenses();
    const balance = income - expenses;

    // Доходы и расходы
    state.money += balance;

    // Естественная динамика города
    if (state.metrics.economy >= 70) {
      changeMetric("happiness", 1);
    }

    if (state.metrics.ecology < 35) {
      changeMetric("health", -1);
    }

    if (state.metrics.mobility < 35) {
      changeMetric("happiness", -1);
    }

    // Население
    const average =
      (
        state.metrics.happiness +
        state.metrics.economy +
        state.metrics.health
      ) / 3;

    if (average >= 70) {
      state.population += 2500;
    } else if (average >= 50) {
      state.population += 800;
    } else {
      state.population -= 400;
    }

    // Дефицит бюджета
    if (state.money < 0) {
      changeMetric("economy", -3);
      changeMetric("happiness", -4);

      addNews("⚠️ Город ушёл в бюджетный дефицит.");
    } else if (balance > 0) {
      addNews(`💰 Бюджет получил +${balance} млн ₸.`);
    } else if (balance < 0) {
      addNews(`📉 Расходы превысили доходы на ${Math.abs(balance)} млн ₸.`);
    }

    state.turn++;

    render();
    updateMap();
    saveGame();

    // После 20-го хода заканчиваем игру
    if (state.turn > state.maxTurns) {
      finishGame();
      return;
    }

    // На следующем ходу может появиться событие
    setTimeout(() => {
      if (!state.gameOver) {
        randomEvent();
      }
    }, 350);
  }
    // =========================
  // ФИНАЛЬНЫЙ СЧЁТ
  // =========================

  function calculateScore() {
    const metricsAverage =
      (
        state.metrics.happiness +
        state.metrics.ecology +
        state.metrics.mobility +
        state.metrics.education +
        state.metrics.health +
        state.metrics.economy
      ) / 6;

    const moneyBonus = clamp(
      state.money / 100,
      0,
      10
    );

    return Math.round(
      clamp(metricsAverage + moneyBonus)
    );
  }


  // =========================
  // ЗАВЕРШЕНИЕ ИГРЫ
  // =========================

  function finishGame() {
    state.gameOver = true;
    state.started = false;
    state.eventOpen = false;

    const score = calculateScore();

    if (finalScore) {
      finalScore.textContent = `${score}/100`;
    }

    if (finalHappiness) {
      finalHappiness.textContent =
        `${Math.round(state.metrics.happiness)}%`;
    }

    if (finalEcology) {
      finalEcology.textContent =
        `${Math.round(state.metrics.ecology)}%`;
    }

    if (finalEconomy) {
      finalEconomy.textContent =
        `${Math.round(state.metrics.economy)}%`;
    }

    // Удаляем сохранение завершённой игры,
    // чтобы после перезагрузки можно было начать заново.
    localStorage.removeItem(SAVE_KEY);

    if (finishModal) {
      finishModal.classList.add("show");
    }
  }


  // =========================
  // СОХРАНЕНИЕ
  // =========================

  function saveGame() {
    try {
      const saveData = {
        turn: state.turn,
        maxTurns: state.maxTurns,
        money: state.money,

        metrics: {
          ...state.metrics
        },

        population: state.population,
        projects: {
          ...state.projects
        },

        news: [
          ...state.news
        ],

        started: state.started,
        gameOver: state.gameOver
      };

      localStorage.setItem(
        SAVE_KEY,
        JSON.stringify(saveData)
      );
    } catch (error) {
      console.error("Ошибка сохранения:", error);
    }
  }


  // =========================
  // ЗАГРУЗКА
  // =========================

  function loadGame() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);

      if (!raw) {
        return false;
      }

      const saved = JSON.parse(raw);

      if (!saved || typeof saved !== "object") {
        return false;
      }

      if (
        typeof saved.turn !== "number" ||
        typeof saved.money !== "number" ||
        !saved.metrics ||
        !saved.projects
      ) {
        return false;
      }

      state.turn = saved.turn;
      state.maxTurns = saved.maxTurns || 20;
      state.money = saved.money;

      state.metrics = {
        ...state.metrics,
        ...saved.metrics
      };

      state.population =
        typeof saved.population === "number"
          ? saved.population
          : 120000;

      state.projects = {
        ...saved.projects
      };

      state.news = Array.isArray(saved.news)
        ? saved.news
        : [];

      state.started = Boolean(saved.started);
      state.gameOver = Boolean(saved.gameOver);

      // Если сохранение уже закончилось,
      // не продолжаем старую игру.
      if (
        state.gameOver ||
        state.turn > state.maxTurns
      ) {
        localStorage.removeItem(SAVE_KEY);
        return false;
      }

      return state.started;
    } catch (error) {
      console.error("Ошибка загрузки:", error);

      localStorage.removeItem(SAVE_KEY);

      return false;
    }
  }


  // =========================
  // НОВАЯ ИГРА
  // =========================

  function resetState() {
    state.turn = 1;
    state.maxTurns = 20;
    state.money = 1200;

    state.metrics = {
      happiness: 60,
      ecology: 55,
      mobility: 50,
      education: 45,
      health: 50,
      economy: 55
    };

    state.population = 120000;
    state.projects = {};

    state.news = [
      "Город просыпается. Жители ждут ваших решений.",
      "Акимат получил новый бюджет.",
      "Начинается первый рабочий месяц."
    ];

    state.started = false;
    state.eventOpen = false;
    state.gameOver = false;
  }

  function createNewGameButton() {
    if (!startScreen) return;

    const oldButton =
      document.getElementById("newGameBtn");

    if (oldButton) {
      oldButton.remove();
    }

    const button = document.createElement("button");

    button.id = "newGameBtn";
    button.type = "button";
    button.textContent = "НОВАЯ ИГРА";

    button.addEventListener("click", () => {
      localStorage.removeItem(SAVE_KEY);

      resetState();

      if (finishModal) {
        finishModal.classList.remove("show");
      }

      if (eventModal) {
        eventModal.classList.remove("show");
      }

      button.remove();

      if (startBtn) {
        startBtn.textContent = "НАЧАТЬ ИГРУ →";
      }

      render();
      updateMap();
    });

    startScreen.appendChild(button);
  }


  // =========================
  // ЗАПУСК ИГРЫ
  // =========================

  function startGame() {
    if (state.gameOver) {
      resetState();
    }

    state.started = true;
    state.gameOver = false;

    if (startScreen) {
      startScreen.classList.add("hidden");
    }

    render();
    updateMap();
    saveGame();

    addNews("🏙️ Вы вступили в должность акима.");
    renderNews();
  }


  // =========================
  // КНОПКА СТАРТА
  // =========================

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      startGame();
    });
  }


  // =========================
  // ПЕРВИЧНЫЙ ЗАПУСК
  // =========================

  const hasSave = loadGame();

  if (hasSave) {
    // Есть сохранённая игра —
    // сразу продолжаем её.
    state.started = true;

    if (startScreen) {
      startScreen.classList.add("hidden");
    }

    if (startBtn) {
      startBtn.textContent = "ПРОДОЛЖИТЬ →";
    }

    createNewGameButton();

    render();
    updateMap();
  } else {
    // Новая игра
    resetState();

    if (startScreen) {
      startScreen.classList.remove("hidden");
    }

    if (startBtn) {
      startBtn.textContent = "НАЧАТЬ ИГРУ →";
    }

    render();
    updateMap();
  }


  // =========================
  // ЗАЩИТА ОТ СЛУЧАЙНОГО
  // ПЕРЕЗАПУСКА СКРИПТА
  // =========================

  window.meroCity = {
    state,
    startGame,
    resetGame: () => {
      localStorage.removeItem(SAVE_KEY);
      resetState();

      if (startScreen) {
        startScreen.classList.remove("hidden");
      }

      render();
      updateMap();
    }
  };

});