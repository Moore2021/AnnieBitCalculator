var options = {
    stickers:{
        randomstickersx1:0x1,
        randomstickersx2:0x2,
    },
    gifts:{
        randomgiftsx1:0x3,
        randomgiftsx2:0x4,
        randomgiftsx3:0x5,
        chocolateboxesx1:0x6,
        chocolateboxesx5:0x7,
        chocolateboxesx10:0x8,
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
        luckyticketsx3:0x20,
        luckyticketsx5:0x21,
        luckyticketsx10:0x22,
        luckyticketsx15:0x23,
        luckyticketsx30:0x24,
        luckyticketsx100:0x25,
        luckyticketsx200:0x26,
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
        magicalpapersx1:0x38,
        magicalpapersx2:0x39,
        magicalpapersx3:0x40,
    }
};
var gifts = {};

function loadPage() {
    organizeOptions();
    populatePage();
    recalculate();
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
            var partOne = options[entries[index][0]][secondaryKey];
            gifts[secondaryKey] = partOne;
            
            var beginnerNode = document.createElement("UL");
            var node = document.createElement("LI");
            var checkbox = document.createElement("INPUT");
            createAttribute(checkbox, "type", "checkbox");
            createAttribute(checkbox, "id", secondaryKey);
            createAttribute(checkbox, "name", secondaryKey);    
            createAttribute(checkbox, "onclick", `recalculate()`);  
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

function recalculate(){

    var perm = 0;
    var eq = [];
    var package = [];

    for(var key in gifts) {
        if(document.getElementById(key).checked) {
            perm += gifts[key];
            eq.push("0x" + gifts[key].toString(16));
            package.push(packageDetails(key));
        }
    }

    eq = `${perm} = ${eq.join(" | ")}`;
    
    
    var package = packageDetailsToString(package);

    document.getElementById("generatedInteger").innerHTML = perm;
    document.getElementById("generatedEquation").innerHTML = eq;
    document.getElementById("generatedPackage").innerHTML = package;

    function packageDetails(gift) {
        var quanity = parseInt(gift.substring(gift.lastIndexOf("x")+1));
        var item = gift.substring(0,gift.lastIndexOf("x"));
        return {quanity: quanity, item: item}
    }

    function packageDetailsToString(packageDetails) {
        
        var holder = {};
        if (!Array.isArray(packageDetails) || !packageDetails.length) return result = "nothing yet";
        var result = ``;
        packageDetails.forEach(function(d) {
          if (holder.hasOwnProperty(d.item)) {
            holder[d.item] = holder[d.item] + d.quanity;
          } else {
            holder[d.item] = d.quanity;
          }
        });
        
        var resultGifts = [];
        for (const property in holder) {
            resultGifts.push(`${holder[property]} ${property}`);
        }

        result += `${resultGifts.join(`, `)}`

        return result;
    }
}


