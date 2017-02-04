/* ===================
 * INIT FUNCTIONS
 * ===================
 */
var _init = new Array();
// Get a registered _init data object
function InitMake( section, object ) {
    if ( typeof localStorage[ section ] !== "undefined" ) {
        return JSON.parse(localStorage[ section ]);
    } else {
        if ( typeof _init[ section ] === 'function' ) {
            return _init[ section ]();
        }
    }
    return (object) ? {} : [];
};
function InitRegister( section, closure ) {
    return (_init[ section ] = closure);
};
/* ===================
 * OBJECT CREATION
 * ===================
 */
function CreateDice( dice_name, dice_formula, dice_note ) {
    return {
        name: dice_name,
        formula: dice_formula,
        note: dice_note
    };
};
function CreateItem( item_name, item_tech, item_cost, item_weight, item_type, item_detail, item_description ) {
    return {
        name: item_name,
        tech: item_tech,
        cost: item_cost,
        weight: item_weight,
        type: item_type,
        detail: item_detail,
        description: item_description
    };
};
function CreateStat( stat_name, stat_type, stat_core, stat_attr, stat_extra, stat_action, stat_description ) {
    return {
        name: stat_name,
        type: stat_type,
        core: stat_core,
        attr: stat_attr,
        extra: stat_extra,
        action: stat_action,
        description: stat_description
    };
};
