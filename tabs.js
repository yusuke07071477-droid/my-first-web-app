// ここからコードを書いてください
export function setupTabs() {
  // ホームリンクと単位変換タブのリンク要素を取得
  const homeLink = document.querySelector('[data-tab="home"]');
  const converterLink = document.querySelector('[data-tab="converter"]');

  // ホームセクションと単位変換セクションの要素を取得
  const home = document.getElementById("home");
  const converter = document.getElementById("converter");

  // ホームリンクがクリックされたときの処理
  homeLink.addEventListener("click", () => {
    converter.classList.add("hidden");
    home.classList.remove("hidden");
  });

  // 単位変換タブがクリックされたときの処理
  converterLink.addEventListener("click", () => {
    home.classList.add("hidden");
    converter.classList.remove("hidden");
  });
}

export function setupConverter() {
  // 変換ロジックに必要な要素を取得
  const converterForm = document.querySelector(".converter-form");
  const converterInput = document.querySelector(".converter-input");
  const converterFrom = document.querySelector(".converter-from");
  const converterTo = document.querySelector(".converter-to");
  const converterResult = document.querySelector(".converter-result");

  // 単位データを定義
  const lengthUnit = [
    { name: "meter", base: 1 },
    { name: "kilometer", base: 1000 },
    { name: "centimeter", base: 0.01 },
    { name: "millimeter", base: 0.001 },
    { name: "inch", base: 0.0254 },
    { name: "foot", base: 0.3048 },
    { name: "yard", base: 0.9144 },
    { name: "mile", base: 1609.344 },
  ];

  // 単位選択欄 (From / To) を初期化
  lengthUnit.forEach((unit) => {
    const fromOption = document.createElement("option");
    fromOption.value = unit.base;
    fromOption.textContent = unit.name;
    converterFrom.appendChild(fromOption);

    const toOption = document.createElement("option");
    toOption.value = unit.base;
    toOption.textContent = unit.name;
    converterTo.appendChild(toOption);
  });

  // 初期値: 変換元は meter、変換先は kilometer
  converterFrom.selectedIndex = 0;
  converterTo.selectedIndex = 1;

  // 変換処理
  function convert() {
    const inputValue = parseFloat(converterInput.value);

    if (isNaN(inputValue)) {
      converterResult.textContent = "Please enter a valid number";
      return;
    }

    const fromUnit = converterFrom.options[converterFrom.selectedIndex];
    const toUnit = converterTo.options[converterTo.selectedIndex];

    const fromBase = parseFloat(fromUnit.value);
    const toBase = parseFloat(toUnit.value);

    const convertedValue = (inputValue * fromBase) / toBase;

    converterResult.textContent = `${inputValue} ${fromUnit.textContent} = ${convertedValue.toFixed(3)} ${toUnit.textContent}`;
  }

  // リアルタイムに変換が行われるようにイベントリスナーを追加
  converterForm.addEventListener("input", convert);

  // 起動時にも結果を表示
  convert();
}
