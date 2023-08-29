function convertAndDownload() {
    // Get the div element and its style
    var div = document.getElementById("targetElement");
    var style = window.getComputedStyle(div);
    console.log(div)
    console.log(style)
    // Create a canvas element and get its context
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
  
    // Set the canvas size to match the div size
    canvas.width = parseInt(style.width);
    canvas.height = parseInt(style.height);
  
    // Fill the canvas with the div background color
    ctx.fillStyle = style.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw the div content on the canvas
    drawDivContent(div, ctx);
  
    // Get the canvas data as a PNG image
    var imgData = canvas.toDataURL("image/png");
  
    // Create a blob object from the image data
    var blob = dataURLToBlob(imgData);
  
    // Create a file object from the blob object
    var file = new File([blob], "div.png", {type: "image/png"});
  
    // Create a URL for the file object
    var url = URL.createObjectURL(file);
  
    // Create a link element and set its href to the URL
    var link = document.createElement("a");
    link.href = url;
  
    // Set the link download attribute to the file name
    link.download = file.name;
  
    // Append the link to the document body
    document.body.appendChild(link);
  
    // Click the link to download the file
    link.click();
  
    // Remove the link from the document body
    document.body.removeChild(link);
  }
  
  // Helper function to draw the div content on the canvas
  function drawDivContent(div, ctx) {
    // Get the div children and loop through them
    var children = div.children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var childStyle = window.getComputedStyle(child);
  
      // Check the child type and draw it accordingly
      if (child.tagName == "IMG") {
        // Create an image object and set its source to the child source
        var image = new Image();
        image.src = child.src;
  
        // Draw the image on the canvas when it is loaded
        image.onload = function() {
          ctx.drawImage(image, parseInt(childStyle.left), parseInt(childStyle.top), parseInt(childStyle.width), parseInt(childStyle.height));
        };
      } else if (child.tagName == "DIV") {
        // Fill the canvas with the child background color
        ctx.fillStyle = childStyle.backgroundColor;
        ctx.fillRect(parseInt(childStyle.left), parseInt(childStyle.top), parseInt(childStyle.width), parseInt(childStyle.height));
  
        // Draw the child text on the canvas
        ctx.fillStyle = childStyle.color;
        ctx.font = childStyle.fontSize + " " + childStyle.fontFamily;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(child.textContent, parseInt(childStyle.left) + parseInt(childStyle.width) / 2, parseInt(childStyle.top) + parseInt(childStyle.height) / 2);
  
        // Recursively draw the child content on the canvas
        drawDivContent(child, ctx);
      }
      // Add more cases for other types of elements if needed
    }
  }
  
  // Helper function to convert a data URL to a blob object
  function dataURLToBlob(dataURL) {
      // Decode the data URL
      var parts = dataURL.split(",");
      var mime = parts[0].match(/:(.*?);/)[1];
      var data = atob(parts[1]);
  
      // Create a Uint8Array from the data
      var array = new Uint8Array(data.length);
      for (var i = 0; i < data.length; i++) {
          array[i] = data.charCodeAt(i);
      }
  
      // Create a blob object from the array
      var blob = new Blob([array], {type: mime});
      return blob;
  }

const headingChange = () => {
    var headingData = document.getElementById('heading').value;
    document.getElementById('headingData').innerHTML = headingData
}

const descrptionChange = () => {
    var descriptionData = document.getElementById('description').value;
    document.getElementById('descriptionData').innerHTML = descriptionData
}

const showPreview = (input, target) => {
    let file = input.files[0];
    let reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = function () {
        let img = document.getElementById(target);
        img.src = reader.result;
    }
}

const changeHeaderAlignment = (alignment) => {
    var data = document.getElementById('headingData');
    if (alignment == 'text-left') {
        data.classList.remove("text-center");
        data.classList.remove("text-right");
        data.classList.add(alignment);
    } else if (alignment == 'text-center') {
        data.classList.remove("text-left");
        data.classList.remove("text-right");
        data.classList.add(alignment);
    } else {
        data.classList.remove("text-center");
        data.classList.remove("text-left");
        data.classList.add(alignment);
    }
}

const changeHeaderColor = (color) => {
    var data = document.getElementById('headingData');
    if (color == 'text-green-700') {
        data.classList.remove("text-black-700");
        data.classList.remove("text-blue-700");
        data.classList.add(color);
    } else if (color == 'text-blue') {
        data.classList.remove("text-black-700");
        data.classList.remove("text-green-700");
        data.classList.add(color);
    } else {
        data.classList.remove("text-blue-700");
        data.classList.remove("text-green-700");
        data.classList.add(color);
    }
}

const headingDisplay = (display) => {
    var data = document.getElementById('heading-property');
    var headingButton = document.getElementById('heading-button');
    if (display == 'hidden') {
        data.classList.remove("block");
        data.classList.add(display);
        headingButton.classList.remove(display);
        headingButton.classList.add('block');
        document.getElementById('headingData').innerHTML = ''
    } else {
        data.classList.remove("hidden");
        data.classList.add(display);
        headingButton.classList.remove(display);
        headingButton.classList.add('hidden');
    }
}

const imageDisplay = (display) => {
    var data = document.getElementById('image-property');
    var imageButton = document.getElementById('image-button');
    if (display == 'hidden') {
        data.classList.remove("block");
        data.classList.add(display);
        imageButton.classList.remove(display);
        imageButton.classList.add('block');
        let img = document.getElementById('previewImage');
        img.src = '';
    } else {
        data.classList.remove("hidden");
        data.classList.add(display);
        imageButton.classList.remove(display);
        imageButton.classList.add('hidden');
    }
}

const descriptionDisplay = (display) => {
    var data = document.getElementById('description-property');
    var descriptionButton = document.getElementById('descripiton-button');
    if (display == 'hidden') {
        data.classList.remove("block");
        data.classList.add(display);
        descriptionButton.classList.remove(display);
        descriptionButton.classList.add('block');
        document.getElementById('descriptionData').innerHTML = '';
    } else {
        data.classList.remove("hidden");
        data.classList.add(display);
        descriptionButton.classList.remove(display);
        descriptionButton.classList.add('hidden');
    }
}