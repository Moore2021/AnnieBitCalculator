var options = {
    stickers:{
        randomstickerx1:0x1,
        randomstickerx2:0x2,
    },
    gifts:{
        randomgiftx1:0x3,
        randomgiftx2:0x4,
        randomgiftx3:0x5,
        chocolateboxx1:0x6,
        chocolateboxx5:0x7,
        chocolateboxx10:0x8,
    },
    currency:{
        artcoinsx50: 0x9,
        artcoinsx200: 0x10,
        artcoinsx250: 0x11,
        artcoinsx300: 0x12,
        artcoinsx400: 0x13,
        artcoinsx500: 0x14,
        artcoinsx1000:0x15,
        artcoinsx2000:0x16,
        artcoinsx5000:0x17,
        artcoinsx10000:0x18,
        artcoinsx20000:0x19,
        luckyticketx3:0x20,
        luckyticketx5:0x21,
        luckyticketx10:0x22,
        luckyticketx15:0x23,
        luckyticketx30:0x24,
        luckyticketx100:0x25,
        luckyticketx200:0x26,
    },
    specialItems:{
        fragmentsx50:0x27,
        fragmentsx200:0x28,
        fragmentsx250:0x29,
        fragmentsx500:0x30,
        fragmentsx2000:0x31,
        fragmentsx3000:0x32,
        fragmentsx4000:0x33,
        fragmentsx5000:0x34,
        fragmentsx10000:0x35,
        fragmentsx25000:0x36,
        fragmentsx50000:0x37,
        magicalpaperx1:0x38,
        magicalpaperx2:0x39,
        magicalpaperx3:0x40,
    }
};

var calculatedBit = 0

function loadPage() {
    organizeOptions();
    populatePage();
}

function organizeOptions() {
    return Object.keys(options).sort();
}

function populatePage() {
   
    var index = 0;
    const entries = Object.entries(options);
    var keys = [];
    for (const entry in entries) {
        keys.push(Object.keys(entries[entry][1]))
    }

    for (const key of keys) {
        var divNode = document.createElement("div");
        createAttribute(divNode, "class", "column");
        var header = document.createElement("h1");
        var visibleText = document.createTextNode(entries[index][0]);
        header.appendChild(visibleText);
        divNode.appendChild(header);
        var horizontalLine = document.createElement("hr");
        divNode.appendChild(horizontalLine);
        

        key.forEach(secondaryKey => {
            var beginnerNode = document.createElement("UL");
            var node = document.createElement("LI");
            var checkbox = document.createElement("INPUT");
            createAttribute(checkbox, "type", "checkbox");
            createAttribute(checkbox, "id", secondaryKey);
            createAttribute(checkbox, "name", secondaryKey);    
            createAttribute(checkbox, "onclick", `recalculate(${secondaryKey})`);  
            createAttribute(checkbox, "title", entries[index][0]); 
            
            var label = document.createElement("LABEL");
            createAttribute(label, "for", secondaryKey);    
            var visibleText = document.createTextNode(secondaryKey);
            label.appendChild(visibleText);
            
            node.appendChild(checkbox);
            node.appendChild(label);

            beginnerNode.appendChild(node);
            divNode.appendChild(beginnerNode);

            document.getElementById("selector").appendChild(divNode);
        });
        index++;
    }

    function createAttribute(node, type, value) {
        var att = document.createAttribute(type);       
        att.value = value;
        node.setAttributeNode(att)
        return;
    }
}

function recalculate(item){

    console.log(calculatedBit)
    var newBit = options[item.title][item.id];
    if (calculatedBit == 0) {calculatedBit = newBit;}
    if (item.checked) {
        console.log("box is checked")
        calculatedBit = calculatedBit | newBit
    } else {
        console.log("box is unchecked")
        calculatedBit = calculatedBit ^ newBit
    }
    
    document.getElementById("generatedInteger").innerHTML = calculatedBit;
}