const colorList = [
    'red',
    'yellow',
    'palevioletred',
    'green',
    'blue',
    'orange',
    'cyan',
    'purple',
    'lightblue',
    'grey',
    'lightgrey',
    'mediumblue',
    'lime',
    'deepskyblue',
    'lightgreen',
    'deeppink',
    'lightyellow',
    'brown',
    'crimson',
    'moccasin',
    'snow',
    'orchid',
    'magenta',
    'darkorange',
  ];
  
  const pixelBoard = document.getElementById('pixel-board');
  const colorOne = document.getElementById('first-color');
  const colorTwo = document.getElementById('second-color');
  const colorThree = document.getElementById('third-color');
  const colorFour = document.getElementById('fourth-color');
  colorOne.classList.add('selected');
  
  const button = document.getElementById('button-random-color');
  button.addEventListener('click', () => {
    paletteColorsGenerator();
    saveStatusPalette();
  });
  
  const generation = (length) => {
    removeAndCreateDivs(length);
    pixelBoard.style.width = length * 40 + 2 + 'px';
    pixelBoard.style.height = length * 40 + 2 + 'px';
    inputPlace.value = '';
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pix, index) => {
      pix.style.backgroundColor = 'white';
    });
    const selected = document.querySelector('.selected');
    selected.classList.remove('selected');
    colorOne.classList.add('selected');
    savePixelColors();
  };
  
  const inputPlace = document.getElementById('board-size');
  const generateButton = document.getElementById('generate-board');
  generateButton.addEventListener('click', () => {
    const value = inputPlace.value;
    if (value >= 5 && value <= 50) {
      generation(value);
    } else if (value < 5 && value > 0) {
      generation(5);
    } else if (value > 50 && value >= 5) {
      generation(50);
    } else if (value === '') {
      alert('Board inválido!');
    } else {
      alert('Digite um valor entre 5 e 50!');
    }
    savePixelsLength();
  });
  
  const saveStatusPalette = () => {
    const status = {
      colorTwo: '',
      colorThree: '',
      colorFour: '',
    };
    status.colorTwo = colorTwo.style.backgroundColor;
    status.colorThree = colorThree.style.backgroundColor;
    status.colorFour = colorFour.style.backgroundColor;
    localStorage.colorPalette = JSON.stringify(status);
  };
  
  const loadStatusPalette = () => {
    const status = JSON.parse(localStorage.colorPalette);
    colorTwo.style.backgroundColor = status.colorTwo;
    colorThree.style.backgroundColor = status.colorThree;
    colorFour.style.backgroundColor = status.colorFour;
  };
  
  const savePixelColors = () => {
    const pixels = document.querySelectorAll('.pixel');
    let arrayColors = [];
    pixels.forEach((pix) => {
      arrayColors.push(pix.style.backgroundColor);
    });
    const saveColors = {};
    pixels.forEach((pix, index) => {
      saveColors[index + 1] = arrayColors[index];
    });
    localStorage.pixelBoard = JSON.stringify(saveColors);
  };
  
  const savePixelsLength = () => {
    const pixels = document.querySelectorAll('.pixel');
    const saveLength = {
      length: '',
    };
    saveLength.length = pixels.length;
    localStorage.boardSize = JSON.stringify(saveLength);
  };
  
  const loadPixelsLength = () => {
    const pixels = document.querySelectorAll('.pixel');
    let pixelsLength = {};
    pixelsLength = JSON.parse(localStorage.boardSize);
    pixelsLength.length = Math.sqrt(pixelsLength.length);
    return pixelsLength.length;
  };
  
  const loadStatusColors = () => {
    const pixels = document.querySelectorAll('.pixel');
    const saveColors = JSON.parse(localStorage.pixelBoard);
    pixels.forEach((pix, index) => {
      pix.style.backgroundColor = saveColors[index + 1];
    });
  };
  
  const colors = document.querySelectorAll('.color');
  
  colors.forEach((color) => {
    color.addEventListener('click', () => {
      const selected = document.querySelector('.selected');
      selected.classList.remove('selected');
      event.target.classList.add('selected');
      paintPixels();
    });
  });
  
  const paintPixels = () => {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pix) => {
      pix.addEventListener('click', () => {
        const selected = document.querySelector('.selected');
        event.target.style.backgroundColor = selected.style.backgroundColor;
        savePixelColors();
      });
    });
  };
  
  const resetButton = document.getElementById('clear-board');
  resetButton.addEventListener('click', () => {
    const pixels = document.querySelectorAll('.pixel');
    pixels.forEach((pix) => {
      pix.style.backgroundColor = 'white';
    });
    savePixelColors();
  });
  
  const removeAndCreateDivs = (value) => {
    const divsRemover = document.getElementsByClassName('pixel');
    while (divsRemover.length > 0) {
      divsRemover[0].parentNode.removeChild(divsRemover[0]);
    }
    for (let index = 0; index < value * value; index += 1) {
      divCreator();
    }
  };
  
  const divCreator = () => {
    const divCreator = document.createElement('div');
    divCreator.classList.add('pixel');
    divCreator.style.backgroundColor = 'white';
    pixelBoard.appendChild(divCreator);
  };
  
  const paletteColorsGenerator = () => {
    colorTwo.style.backgroundColor =
      colorList[Math.floor(Math.random() * (colorList.length - 1))];
    let filterColorList = colorList;
    filterColorList = filterColorList.filter(
      (color) => color !== colorTwo.style.backgroundColor
    );
    colorThree.style.backgroundColor =
      filterColorList[Math.floor(Math.random() * (filterColorList.length - 1))];
    filterColorList = filterColorList.filter(
      (color) => color !== colorThree.style.backgroundColor
    );
    colorFour.style.backgroundColor =
      filterColorList[Math.floor(Math.random() * (filterColorList.length - 1))];
  };
  
  window.onload = () => {
    const pixels = document.querySelectorAll('.pixel');
    if (localStorage.colorPalette) {
      colorOne.style.backgroundColor = 'black';
      colorOne.classList.add('selected');
      loadStatusPalette();
      paintPixels();
    } else {
      colorOne.style.backgroundColor = 'black';
      colorOne.classList.add('selected');
      paletteColorsGenerator();
      removeAndCreateDivs(5);
      paintPixels();
    }
    if (localStorage.pixelBoard) {
      if (localStorage.pixelsLength) {
        pixelBoard.style.width = loadPixelsLength() * 40 + 2 + 'px';
        pixelBoard.style.height = loadPixelsLength() * 40 + 2 + 'px';
        removeAndCreateDivs(loadPixelsLength());
        loadStatusColors();
        paintPixels();
      } else {
        let lengthOfColors = JSON.parse(localStorage.pixelBoard);
        lengthOfColors = Math.sqrt(Object.keys(lengthOfColors).length);
        pixelBoard.style.width = lengthOfColors * 40 + 2 + 'px';
        pixelBoard.style.height = lengthOfColors * 40 + 2 + 'px';
        removeAndCreateDivs(lengthOfColors);
        loadStatusColors();
        paintPixels();
      }
    } else {
      removeAndCreateDivs(5);
      pixels.forEach((pix) => {
        pix.style.backgroundColor = 'white';
      });
      paintPixels();
    }
  };
  