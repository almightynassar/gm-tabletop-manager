/**
 * The Monster Stat block
 * 
 * Creates a self-contained HTML5 stat block
 */
var monsterStatBlock = (function (window) {
	// The CSS
	var cssMain = "width:310px; font-family:Arial,Helvetica,sans-serif;font-size:11px;";
	var cssGradient = "background: linear-gradient(10deg, #A73335, white);height:5px;margin:7px 0px;";
	var cssName = "font-size:225%; font-family:Georgia, serif; font-variant:small-caps; font-weight:bold; color:#A73335;";
	var cssDesc = "font-style:italic;";
	var cssBold = "font-weight:bold;";
	var cssRed = "color:#A73335;";
	var cssTable = "width:100%; border:0px; border-collapse:collapse; color:#A73335;";
	var cssThTd = "width:50px; text-align:center;";
	var cssActions = "font-size:175%; font-variant:small-caps; margin:17px 0px 0px 0px;";
	var cssHr = "background: #A73335; height:2px;";
	var cssAttack = "margin:5px 0px;";
	var cssAttackName = "font-weight:bold; font-style:italic;";
	// The statistics
	var monsterName = 'Ogre';
	var monsterDesc = 'Large giant, chaotic evil';
	var monsterAC = '11 (hide armour)';
	var monsterHP = '59 (7d10+21)';
	var monsterSpeed = '40 ft';
	var monsterSTR = "19 (+4)";
	var monsterDEX = "8 (-1)";
	var monsterCON = "16 (+3)";
	var monsterINT = "5 (-3)";
	var monsterWIS = "7 (-2)";
	var monsterCHA = "7 (-2)";
	var monsterSaving = "";
	var monsterSkills = "";
	var monsterResist = "";
	var monsterImmune = "";
	var monsterCondition = "";
	var monsterSense = "darkvision";
	var monsterLanguage = "-";
	var monsterCR = "2";
	var monsterTraits = [];
	var monsterActions = [];
	var monsterReactions = [];
	// Create a HTML Element
	function makeElement(type, name, style) {
		var e = document.createElement(type);
		e.className = name;
		if (style) {
			e.setAttribute('style',style);
		}
		return e;
	};
	// Create an element with enclosed text
	function makeWithText(type, name, text, style) {
		var e = makeElement(type, name, style);
		e.innerHTML = text;
		return e;
	}
	// Create the Attributes table
	function attributeTable() {
		var table = makeElement("table", "table", cssTable);
		var row1 = document.createElement('tr');
		var row2 = document.createElement('tr');
		var strTH = makeWithText("th", "th", 'STR', cssThTd);
		var dexTH = makeWithText("th", "th", 'DEX', cssThTd);
		var conTH = makeWithText("th", "th", 'CON', cssThTd);
		var intTH = makeWithText("th", "th", 'INT', cssThTd);
		var wisTH = makeWithText("th", "th", 'WIS', cssThTd);
		var chaTH = makeWithText("th", "th", 'CHA', cssThTd);
		var strTD = makeWithText("th", "th", monsterSTR, cssThTd);
		var dexTD = makeWithText("th", "th", monsterDEX, cssThTd);
		var conTD = makeWithText("th", "th", monsterCON, cssThTd);
		var intTD = makeWithText("th", "th", monsterINT, cssThTd);
		var wisTD = makeWithText("th", "th", monsterWIS, cssThTd);
		var chaTD = makeWithText("th", "th", monsterCHA, cssThTd);
		row1.appendChild(strTH);
		row1.appendChild(dexTH);
		row1.appendChild(conTH);
		row1.appendChild(intTH);
		row1.appendChild(wisTH);
		row1.appendChild(chaTH);
		table.appendChild(row1);
		row2.appendChild(strTD);
		row2.appendChild(dexTD);
		row2.appendChild(conTD);
		row2.appendChild(intTD);
		row2.appendChild(wisTD);
		row2.appendChild(chaTD);
		table.appendChild(row2);
		return table;
	}
	// Render the Document
	function render() {
		// The main div element
		var main = makeElement("div", "monsterStatBlock", cssMain);
		// The Descriptor
		main.setAttribute('contentEditable', 'true');
		main.appendChild(makeWithText("div","name",monsterName,cssName));
		main.appendChild(makeWithText("div","description",monsterDesc,cssDesc));
		main.appendChild(makeElement("div", "gradient", cssGradient));
		// The Defensive stats
		var defStat = makeElement("div", "red", cssRed);
		var temp = makeElement("div", "ac", "");
		temp.appendChild(makeWithText("span","bold red","Armour Class",cssBold+cssRed));
		temp.appendChild(makeWithText("span","ac",' '+monsterAC,''));
		defStat.appendChild(temp);
		var temp2 = makeElement("div", "hp", "");
		temp2.appendChild(makeWithText("span","bold red","Hit Points",cssBold+cssRed));
		temp2.appendChild(makeWithText("span","hp",' '+monsterHP,''));
		defStat.appendChild(temp2);
		var temp3 = makeElement("div", "speed", "");
		temp3.appendChild(makeWithText("span","bold red","Speed",cssBold+cssRed));
		temp3.appendChild(makeWithText("span","speed",' '+monsterSpeed,''));
		defStat.appendChild(temp3);
		main.appendChild(defStat);
		main.appendChild(makeElement("div", "gradient", cssGradient));
		main.appendChild(attributeTable());
		main.appendChild(makeElement("div", "gradient", cssGradient));
		// For the senses and saving throws
		if (monsterSaving) {
			var stStat = makeElement("div", "saving", '');
			var temp = makeElement("div", "saving", "");
			temp.appendChild(makeWithText("span","bold","Saving Throws",cssBold));
			temp.appendChild(makeWithText("span","saving",' '+monsterSaving,''));
			crStat.appendChild(temp);
			main.appendChild(stStat);
		}
		var crStat = makeElement("div", "cr", '');
		var temp4 = makeElement("div", "cr", "");
		temp4.appendChild(makeWithText("span","bold","CR",cssBold));
		temp4.appendChild(makeWithText("span","cr",' '+monsterCR,''));
		crStat.appendChild(temp4);
		main.appendChild(crStat);
		// Begin Traits and Actions
		main.appendChild(makeElement("div", "gradient", cssGradient));
		if (monsterTraits.length > 0) {
		}
		if (monsterActions.length > 0) {
			main.appendChild(makeWithText("div", "actions red", "Actions", cssActions+cssRed));
			main.appendChild(makeElement("div", "hr", cssHr));
		}
		if (monsterReactions.length > 0) {
			main.appendChild(makeWithText("div", "actions red", "Reactions", cssActions+cssRed));
			main.appendChild(makeElement("div", "hr", cssHr));
		}
		
		return main;
	}
	return {
		getCSS: function() { return css; },
		getStatBlock: function() { return render(); }
	};
})();


/*
.gradient {
    background: linear-gradient(10deg, #A73335, white);
    height:5px;
    margin:7px 0px;
}
.name {
    font-size:225%;
    font-family:Georgia, serif;
    font-variant:small-caps;
    font-weight:bold;
    color:#A73335;
}
.description {
    font-style:italic;    
}
.bold {
    font-weight:bold;
}
.red {
    color:#A73335;
}
table {
    width:100%;
    border:0px;
    border-collapse:collapse;
    color:#A73335;
}
th, td {
    width:50px;
    text-align:center;
}
.actions {
    font-size:175%;
    font-variant:small-caps;
    margin:17px 0px 0px 0px;
}
.hr {
    background: #A73335;
    height:2px;
}
.attack {
    margin:5px 0px;
}
.attackname {
    font-weight:bold;
    font-style:italic;
}

<div contenteditable="true"  style="width:310px; font-family:Arial,Helvetica,sans-serif;font-size:11px;">
<div class="name">Ogre</div>
<div class="description">Large giant, chaotic evil</div>

<div class="gradient"></div>

<div class="red">
    <div ><span class="bold red">Armor Class</span><span> 11 (hide armor)</span></div>
    <div><span class="bold red">Hit Points</span><span> 59 (7d10+21)</span></div>
    <div><span class="bold red">Speed</span><span> 40 ft.</span></div>
</div>

<div class="gradient"></div>

<table>
    <tr><th>STR    </th><th>DEX   </th><th>CON    </th><th>INT   </th><th>WIS   </th><th>CHA   </th></tr>
    <tr><td>19 (+4)</td><td>8 (-1)</td><td>16 (+3)</td><td>5 (-3)</td><td>7 (-2)</td><td>7 (-2)</td></tr>
</table>
    
<div class="gradient"></div>
    
<div><span class="bold">Senses</span><span> darkvision 60ft., passive Perception 8</span></div>
<div><span class="bold">Languages</span><span> Common, Giant</span></div>
<div><span class="bold">Challenge</span><span> 2 (450 XP)</span></div> 
    
<div class="gradient"></div>

<div class="actions red">Actions</div>
    
<div class="hr"></div>
 
<div class="attack"><span class="attackname">Greatclub.</span><span class="description"> Melee Weapon Attack:</span><span>+6 to hit, reach 5 ft., one target.</span><span class="description">Hit:</span><span>13 (2d8+4) bludgeoning damage.</span></div>    
<div class="attack"><span class="attackname">Javelin.</span><span class="description"> Melee or Ranged Weapon Attack:</span><span>+6 to hit, reach 5 ft. or 30ft./120, one target.</span><span class="description">Hit:</span><span>11 (2d6+4) piercing damage.</span></div>    
</div>
*/