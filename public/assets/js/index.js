/* Document On-Load's
------------------------------------------------------------------------------*/

$(function() {

    /**
     * Event listener for homepage presets.
     */
    $("#homepage-presets").on('click', 'li', loadPreset);

    /**
     * Loads the pre-set options onto the character.
     */
    function loadPreset()
    {
        // Get the set id.
        var setID = $(this).attr("data-setid");

        // Query the specific set.
        data.getSets(setID, function(set) {
            
            // Load in the accessories.
            data.getCatalog(null, function(catalog) {

                // Set chest preset.
                $('#chest').html('');
                $('#chest').prepend('<img class="draggable drag-drop chest can-drop" src="' + catalog[set["chest"]].accessoryImage + '" />')
                
                // Set head preset.
                $('#head').html('');
                $('#head').prepend('<img class="draggable drag-drop head can-drop" src="' + catalog[set["head"]].accessoryImage + '" />')

                // Set weapon preset.
                $('#weapon').html('');
                $('#weapon').prepend('<img class="draggable drag-drop weapon can-drop" src="' + catalog[set["weapon"]].accessoryImage + '" />')

                // Set accessory preset.
                $('#accessory').html('');
                $('#accessory').prepend('<img class="draggable drag-drop accessory can-drop" src="' + catalog[set["accessory"]].accessoryImage + '" />')

                // Get the values of all the sets.
                // TODO: Add a column in pre-defined sets with this value calculated beforehand.
                var damage = parseInt(catalog[set["chest"]].accessoryDamage) + parseInt(catalog[set["head"]].accessoryDamage) + parseInt(catalog[set["weapon"]].accessoryDamage) + parseInt(catalog[set["accessory"]].accessoryDamage);
                var protection = parseInt(catalog[set["chest"]].accessoryProtection) + parseInt(catalog[set["head"]].accessoryProtection) + parseInt(catalog[set["weapon"]].accessoryProtection) + parseInt(catalog[set["accessory"]].accessoryProtection);
                var weight = parseInt(catalog[set["chest"]].accessoryWeight) + parseInt(catalog[set["head"]].accessoryWeight) + parseInt(catalog[set["weapon"]].accessoryWeight) + parseInt(catalog[set["accessory"]].accessoryWeight);

                // Get our stats bars
                let damageBar = $('.stats .progress #damage-bar').get(0);
                let protectionBar = $('.stats .progress #protection-bar').get(0);
                let weightBar = $('.stats .progress #weight-bar').get(0);

                // Update stat bar values.
                damageBar.setAttribute('aria-valuenow', parseInt(damage));
                protectionBar.setAttribute('aria-valuenow', parseInt(protection));
                weightBar.setAttribute('aria-valuenow', parseInt(weight));

                // Update width settings.
                damageBar.style.width = "" + damage + "%";
                protectionBar.style.width = "" + protection + "%";
                weightBar.style.width = "" + weight + "%";
            });

        });
    }

});


/* Tooltip-on-Hover
------------------------------------------------------------------------------*/

let tooltip = document.querySelectorAll('.coupontooltip');

document.addEventListener('mousemove', function(e) {
    for (let i = tooltip.length; i--;) {
        tooltip[i].style.left = e.pageX + 'px';
        tooltip[i].style.top = e.pageY + 'px';
    }
}, false);


/* Drag-and-Drop Variables
-----------------------------------------------------------------------------*/

let element = document.getElementsByClassName('dropzone'),
    x = 0,
    y = 0;

// Our currently-interacting item and slot.
let draggableElement;
let dropzoneElement;

// Our item and itemType currently selected
let item;
let itemType;

// Initialize our character object
let character = {
    slots: {
        head: {
            isEquipped: false,
            item: null
        },
        chest: {
            isEquipped: false,
            item: null
        },
        weapon: {
            isEquipped: false,
            item: null
        },
        accessory: {
            isEquipped: false,
            item: null
        },
    },
    stats: {
        damage: 0,
        weight: 0,
        protection: 0
    }
}

let resetButton = $('#set-reset').click(function() {
    let all = $('.can-drop').toArray();
    characterReset();
    for (var i = 0; i < all.length; i++) {
        itemReset(all[i]);
    }
    updateStatsBars();
});


/* Drag-and-Drop Functions
------------------------------------------------------------------------------*/

/**
 * Check to see if an item is valid for the slot it's being hovered/dropped on.
 * @return {Boolean} Is item in right spot
 */
function isValidItem(draggable, dropzone) {
    return dropzone.classList.contains(draggable.classList.item(2));
}

/**
 * Remove color formatting from item.
 * @param  {[type]} draggable currently interactive item
 */
function itemRemoveColor(draggable) {
    // Remove the color classes currently attached to our item
    draggable.classList.remove('can-drop');
    draggable.classList.remove('can-not-drop');
}

/**
 * Reset the position (remove translation) of the item
 * @param  {[type]} draggable currently interactive item
 */
function itemRemoveTranslation(draggable) {
    draggable.style.transform = 'none';
    draggable.removeAttribute("data-x");
    draggable.removeAttribute("data-y");
}

/**
 * Reset the color and position of an item back to it's origin.
 * @param {[type]} draggable the item we're resetting.
 */
function itemReset(draggable) {
    itemRemoveColor(draggable);
    itemRemoveTranslation(draggable);
}

/**
 * Add to our character's stats total.
 * @param {[type]} item     the item
 * @param {[type]} itemType the item type
 */
function addItem(item, itemType) {

    // Get stats from our item's tooltip div
    let damage = $('#' + item + ' .coupontooltip .coupontooltip-text #damage').html();
    let protection = $('#' + item + ' .coupontooltip .coupontooltip-text #protection').html();
    let weight = $('#' + item + ' .coupontooltip .coupontooltip-text #weight').html();

    // Sum stats from new item
    character.stats.damage += parseInt(damage) || 0;
    character.stats.protection += parseInt(protection) || 0;
    character.stats.weight += parseInt(weight) || 0;

    // Fill character's slot for that item type
    character.slots[itemType].isEquipped = true;
    character.slots[itemType].item = item;

    updateStatsBars();

}

/**
 * Remove stats from our character's total upon removal of item
 * @param {[type]} item     the item
 * @param {[type]} itemType the item type
 */
function removeItem(item, itemType) {

    // Get stats from our item's tooltip div
    let damage = $('#' + item + ' .coupontooltip #damage').html();
    let protection = $('#' + item + ' .coupontooltip #protection').html();
    let weight = $('#' + item + ' .coupontooltip #weight').html();

    // Remove the stats from our character
    character.stats.damage -= parseInt(damage);
    character.stats.protection -= parseInt(protection);
    character.stats.weight -= parseInt(weight);

    // Don't let glitches ruin our stat floor
    if (character.stats.damage < 0) character.stats.damage = 0;
    if (character.stats.protection < 0) character.stats.protection = 0;
    if (character.stats.weight < 0) character.stats.weight = 0;

    // Empty the item slot upon the item leaving drag area.
    character.slots[itemType].isEquipped = false;
    character.slots[itemType].item = null;

    updateStatsBars();

}

/**
 * Update the values of the stats bars to represent character's current stats.
 */
function updateStatsBars() {

    // Get our stats bars
    let damageBar = $('.stats .progress #damage-bar').get(0);
    let protectionBar = $('.stats .progress #protection-bar').get(0);
    let weightBar = $('.stats .progress #weight-bar').get(0);

    damageBar.setAttribute('aria-valuenow', parseInt(character.stats.damage));
    protectionBar.setAttribute('aria-valuenow', character.stats.protection);
    weightBar.setAttribute('aria-valuenow', character.stats.weight);

    damageBar.style.width = "" + character.stats.damage + "%";
    protectionBar.style.width = "" + character.stats.protection + "%";
    weightBar.style.width = "" + character.stats.weight + "%";

}

/**
 * Resets the character's stats and booleans.
 */
function characterReset() {

    let slots = character['slots'];
    let stats = character['stats'];

    for (var key in slots) {
        slots[key].isEquipped = false;
        slots[key].item = null;
    }

    for (var key in stats) {
        stats[key] = 0;
    }

}

/**
 * Places all the items on screen from a particular set.
 * @param  {String} set the name of the set
 */
function getItems(set) {
    console.log(set);
}


/* Interact.js Implementation and Listeners
------------------------------------------------------------------------------*/

// target elements with the "draggable" class
interact('.draggable')
    .draggable({

        // enable inertial throwing
        inertia: true,

        // keep the element within the area of it's parent
        restrict: {
            restriction: "#overlay",
            endOnly: true,
            elementRect: {
                top: 0,
                left: 0,
                bottom: 1,
                right: 1
            }
        },

        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,

        // call this function on every dragend event
        onend: function(event) {
            // TODO: implement action for when drag and drop has ended.
        }
    })
    .on('dragmove', function(event) {
        x += event.dx;
        y += event.dy;

        event.target.style.webkitTransform =
            event.target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';
    });

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

/*
Our interact.js method allowing for our drag-and-drop system.
 */
interact('.dropzone').dropzone({

    // Only accept elements matching these CSS selectors.
    accept: [
        '#helmet',
        '#weapon',
        '#accessory',
        '#chest'
    ],

    // Percentage of required coverage of slot by item to activate valid drop.
    overlap: 0.85,

    /*
    Listener for drop related events.
     */
    ondropactivate: function(event) {

        // add active dropzone feedback
        event.target.classList.add('drop-active');

    },

    /*
    Listener for when an item is dragged to the center of the slot.
    Changes color once successful (green/red).
     */
    ondragenter: function(event) {

        // Assign our currently interacting objects
        draggableElement = event.relatedTarget;
        dropzoneElement = event.target;

        // The item and type that we're dragging (i.e. head, chest, etc.)
        item = draggableElement.parentElement.id;
        itemType = draggableElement.classList.item(2);

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target');

        // Checks if it's a valid item for this slot. If it is, apply
        // green background - if not, apply red.
        if (isValidItem(draggableElement, dropzoneElement) &&
            !character.slots[itemType].isEquipped) {

            console.log(draggableElement);

            draggableElement.classList.add('can-drop');

        } else {

            draggableElement.classList.add('can-not-drop');

        }

    },

    /*
    Listener for when an item, which is currently centered on a slot, leaves
    the center of the slot (color goes back to purple).
     */
    ondragleave: function(event) {

        draggableElement = event.relatedTarget;
        dropzoneElement = event.target;

        // The item and type that we're dragging (i.e. head, chest, etc.)
        item = draggableElement.parentElement.id;
        itemType = draggableElement.classList.item(2);

        // Remove our character's stats attributed to this item
        if (character.slots[itemType].isEquipped &&
            draggableElement.classList.contains('can-drop')) {
            removeItem(item, itemType)
        }

        // Reset the color of our item back to normal
        itemRemoveColor(draggableElement);

        // Turn off our slot feedback
        dropzoneElement.classList.remove('drop-target');

    },

    /*
    Listener for when an item has been dropped on a slot. Here we check if
    it's a valid slot for the item, and if not, we return the item to it's
    origin.
     */
    ondrop: function(event) {

        dropzoneElement = event.target;
        draggableElement = event.relatedTarget;

        // The item name and type that we're dragging
        item = draggableElement.parentElement.id;
        itemType = draggableElement.classList.item(2);

        // Check if this is a valid drop zone for this itemType
        if (isValidItem(draggableElement, dropzoneElement) &&
            !character.slots[itemType].isEquipped) {

            // Depending on our item, add stats to character's total.
            addItem(item, itemType);

        } else {

            // Invalid item, remove color and return to origin position
            itemReset(draggableElement);

        }
    },
    ondropdeactivate: function(event) {

        // remove active dropzone feedback
        event.target.classList.remove('drop-active');
        event.target.classList.remove('drop-target');

    }
});


/* Ash Effects
------------------------------------------------------------------------------*/

(function() {
    var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

    NUM_CONFETTI = 50;

    COLORS = [
        [55, 55, 55],
        [77, 77, 77],
        [111, 111, 111],
        [55, 55, 55],
        [248, 182, 70]
    ];

    PI_2 = 2 * Math.PI;

    canvas = document.getElementById("world");

    context = canvas.getContext("2d");

    window.w = 0;

    window.h = 0;

    resizeWindow = function() {
        window.w = canvas.width = window.innerWidth;
        return window.h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeWindow, false);

    window.onload = function() {
        return setTimeout(resizeWindow, 0);
    };

    range = function(a, b) {
        return (b - a) * Math.random() + a;
    };

    drawCircle = function(x, y, r, style) {
        context.beginPath();
        context.arc(x, y, r, 0, PI_2, false);
        context.fillStyle = style;
        return context.fill();
    };

    xpos = 0.5;

    document.onmousemove = function(e) {
        return xpos = e.pageX / w;
    };

    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();

    Confetti = class Confetti {
        constructor() {
            this.style = COLORS[~~range(0, 5)];
            this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
            this.r = ~~range(2, 6);
            this.r2 = 2 * this.r;
            this.replace();
        }

        replace() {
            this.opacity = 0;
            this.dop = 0.03 * range(1, 4);
            this.x = range(-this.r2, w - this.r2);
            this.y = range(-20, h - this.r2);
            this.xmax = w - this.r;
            this.ymax = h - this.r;
            this.vx = range(0, 2) + 8 * xpos - 5;
            return this.vy = 0.7 * this.r + range(-1, 1);
        }

        draw() {
            var ref;
            this.x += this.vx;
            this.y += this.vy;
            this.opacity += this.dop;
            if (this.opacity > 1) {
                this.opacity = 1;
                this.dop *= -1;
            }
            if (this.opacity < 0 || this.y > this.ymax) {
                this.replace();
            }
            if (!((0 < (ref = this.x) && ref < this.xmax))) {
                this.x = (this.x + this.xmax) % this.xmax;
            }
            return drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
        }

    };

    confetti = (function() {
        var j, ref, results;
        results = [];
        for (i = j = 1, ref = NUM_CONFETTI; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
            results.push(new Confetti);
        }
        return results;
    })();

    window.step = function() {
        var c, j, len, results;
        requestAnimationFrame(step);
        context.clearRect(0, 0, w, h);
        results = [];
        for (j = 0, len = confetti.length; j < len; j++) {
            c = confetti[j];
            results.push(c.draw());
        }
        return results;
    };

    step();

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQSxNQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsWUFBQSxFQUFBLElBQUEsRUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLE9BQUEsRUFBQSxVQUFBLEVBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxZQUFBLEVBQUE7O0VBQUEsWUFBQSxHQUFlOztFQUNmLE1BQUEsR0FBUyxDQUFDLENBQUMsRUFBRCxFQUFJLEVBQUosRUFBTyxFQUFQLENBQUQsRUFBYSxDQUFDLEVBQUQsRUFBSSxFQUFKLEVBQU8sRUFBUCxDQUFiLEVBQXlCLENBQUMsRUFBRCxFQUFJLEVBQUosRUFBTyxFQUFQLENBQXpCLEVBQXFDLENBQUMsRUFBRCxFQUFJLEVBQUosRUFBTyxFQUFQLENBQXJDLEVBQWlELENBQUMsR0FBRCxFQUFLLEdBQUwsRUFBUyxFQUFULENBQWpEOztFQUNULElBQUEsR0FBTyxDQUFBLEdBQUUsSUFBSSxDQUFDOztFQUdkLE1BQUEsR0FBUyxRQUFRLENBQUMsY0FBVCxDQUF3QixPQUF4Qjs7RUFDVCxPQUFBLEdBQVUsTUFBTSxDQUFDLFVBQVAsQ0FBa0IsSUFBbEI7O0VBQ1YsTUFBTSxDQUFDLENBQVAsR0FBVzs7RUFDWCxNQUFNLENBQUMsQ0FBUCxHQUFXOztFQUVYLFlBQUEsR0FBZSxRQUFBLENBQUEsQ0FBQTtJQUNiLE1BQU0sQ0FBQyxDQUFQLEdBQVcsTUFBTSxDQUFDLEtBQVAsR0FBZSxNQUFNLENBQUM7V0FDakMsTUFBTSxDQUFDLENBQVAsR0FBVyxNQUFNLENBQUMsTUFBUCxHQUFnQixNQUFNLENBQUM7RUFGckI7O0VBSWYsTUFBTSxDQUFDLGdCQUFQLENBQXdCLFFBQXhCLEVBQWtDLFlBQWxDLEVBQWdELEtBQWhEOztFQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFFBQUEsQ0FBQSxDQUFBO1dBQUcsVUFBQSxDQUFXLFlBQVgsRUFBeUIs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O0VBSFk7O0VBS2QsSUFBQSxDQUFBO0FBL0VBIiwic291cmNlc0NvbnRlbnQiOlsiTlVNX0NPTkZFVFRJID0gNTBcbkNPTE9SUyA9IFtbNTUsNTUsNTVdLCBbNTUsNTUsNTVdLCBbNTUsNTUsNTVdLCBbNTUsNTUsNTVdLCBbMjQ4LDE4Miw3MF1dXG5QSV8yID0gMipNYXRoLlBJXG5cblxuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgXCJ3b3JsZFwiXG5jb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQgXCIyZFwiXG53aW5kb3cudyA9IDBcbndpbmRvdy5oID0gMFxuXG5yZXNpemVXaW5kb3cgPSAtPlxuICB3aW5kb3cudyA9IGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gIHdpbmRvdy5oID0gY2FudmFzLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciAncmVzaXplJywgcmVzaXplV2luZG93LCBmYWxzZVxuICBcbndpbmRvdy5vbmxvYWQgPSAtPiBzZXRUaW1lb3V0IHJlc2l6ZVdpbmRvdywgMFxuXG5yYW5nZSA9IChhLGIpIC0+IChiLWEpKk1hdGgucmFuZG9tKCkgKyBhXG5cbmRyYXdDaXJjbGUgPSAoeCx5LHIsc3R5bGUpIC0+XG4gIGNvbnRleHQuYmVnaW5QYXRoKClcbiAgY29udGV4dC5hcmMoeCx5LHIsMCxQSV8yLGZhbHNlKVxuICBjb250ZXh0LmZpbGxTdHlsZSA9IHN0eWxlXG4gIGNvbnRleHQuZmlsbCgpXG5cbnhwb3MgPSAwLjVcblxuZG9jdW1lbnQub25tb3VzZW1vdmUgPSAoZSkgLT5cbiAgeHBvcyA9IGUucGFnZVgvd1xuXG53aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gZG8gLT5cbiAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSAgICAgICB8fFxuICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgfHxcbiAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgICB8fFxuICB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gIChjYWxsYmFjaykgLT4gd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MClcblxuXG5jbGFzcyBDb25mZXR0aVxuXG4gIGNvbnN0cnVjdG9yOiAtPlxuICAgIEBzdHlsZSA9IENPTE9SU1t+fnJhbmdlKDAsNSldXG4gICAgQHJnYiA9IFwicmdiYSgje0BzdHlsZVswXX0sI3tAc3R5bGVbMV19LCN7QHN0eWxlWzJdfVwiXG4gICAgQHIgPSB+fnJhbmdlKDIsNilcbiAgICBAcjIgPSAyKkByXG4gICAgQHJlcGxhY2UoKVxuXG4gIHJlcGxhY2U6IC0+XG4gICAgQG9wYWNpdHkgPSAwXG4gICAgQGRvcCA9IDAuMDMqcmFuZ2UoMSw0KVxuICAgIEB4ID0gcmFuZ2UoLUByMix3LUByMilcbiAgICBAeSA9IHJhbmdlKC0yMCxoLUByMilcbiAgICBAeG1heCA9IHctQHJcbiAgICBAeW1heCA9IGgtQHJcbiAgICBAdnggPSByYW5nZSgwLDIpKzgqeHBvcy01XG4gICAgQHZ5ID0gMC43KkByK3JhbmdlKC0xLDEpXG5cbiAgZHJhdzogLT5cbiAgICBAeCArPSBAdnhcbiAgICBAeSArPSBAdnlcbiAgICBAb3BhY2l0eSArPSBAZG9wXG4gICAgaWYgQG9wYWNpdHkgPiAxXG4gICAgICBAb3BhY2l0eSA9IDFcbiAgICAgIEBkb3AgKj0gLTFcbiAgICBAcmVwbGFjZSgpIGlmIEBvcGFjaXR5IDwgMCBvciBAeSA+IEB5bWF4XG4gICAgaWYgISgwIDwgQHggPCBAeG1heClcbiAgICAgIEB4ID0gKEB4ICsgQHhtYXgpICUgQHhtYXhcbiAgICBkcmF3Q2lyY2xlKH5+QHgsfn5AeSxAcixcIiN7QHJnYn0sI3tAb3BhY2l0eX0pXCIpXG5cblxuY29uZmV0dGkgPSAobmV3IENvbmZldHRpIGZvciBpIGluIFsxLi5OVU1fQ09ORkVUVEldKVxuXG53aW5kb3cuc3RlcCA9IC0+XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGVwKVxuICBjb250ZXh0LmNsZWFyUmVjdCgwLDAsdyxoKVxuICBjLmRyYXcoKSBmb3IgYyBpbiBjb25mZXR0aVxuXG5zdGVwKCkiXX0=
//# sourceURL=coffeescript
