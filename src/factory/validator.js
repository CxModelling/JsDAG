class Validator {
    constructor(name, type, desc, optional=false) {
        this.Name = name;
        this.Type = type;
        this.Description = desc || name;
        this.Optional = Boolean(optional)
    }

    to_form() {
        return {
            'Name': this.Name,
            'Type': this.Type,
            'Description': this.Description,
            'Optional': this.Optional
        }
    }

    check(value, resource) {
        if (value == null) {
            return false;
        } else if (resource && value in resource) {
            return resource[value];
        } else {
            return value;
        }
    }

    correct(value, resource) {
        if (resource && value in resource) {
            return resource[value];
        } else {
            return value;
        }
    }
}


class NotNull extends Validator {
    constructor(name, desc, optional) {
        super(name, "notnull", desc, Boolean(optional));
    }

    check(value, resource) {
        if (value == null) {
            return false;
        } else {
            return true;
        }
    }
}


class Float extends Validator {
    constructor(name, lower=-Infinity, upper=Infinity, def=0, desc=null, optional=false) {
        super(name, "float", desc, optional);
        this.Lower = lower;
        this.Upper = upper;
        this.Default = def;
    }

    check(value, resource) {
        if (resource && value in resource) {
            value = resource[value];
        }
        value = parseFloat(value);

        if (isNaN(value) || value > this.Upper || value < this.Lower) {
            return false;
        }
        return true;
    }

    to_form(resource) {
        return Object.assign(super.to_form(resource),
            {Lower: this.Lower, Upper: this.Upper, Default: this.Default});
    }

    correct(value, resource) {
        value = super.correct(value, resource);
        value = parseFloat(value);
        if (isNaN(value)) {
            value = this.Default;
        } else if (value > this.Upper) {
            value = this.Upper;
        } else if (value < this.Lower) {
            value = this.Lower;
        }
        return value;
    }
}


class PositiveFloat extends Float {
    constructor(name, def=0, desc=null, optional=false) {
        super(name, 0, Infinity, def, desc, optional);
    }
}


class NegativeFloat extends Float {
    constructor(name, def=0, desc=null, optional=false) {
        super(name, -Infinity, 0, def, desc, optional);
    }
}


class Prob extends Float {
    constructor(name, def=0.5, desc=null, optional=false) {
        super(name, 0, 1, def, desc, optional);
    }
}


class Integer extends Validator {
    constructor(name, lower=-Infinity, upper=Infinity, def=0, desc=null, optional=false) {
        super(name, "int", desc, optional);
        this.Lower = lower;
        this.Upper = upper;
        this.Default = def;
    }

    check(value, resource) {
        if (resource && value in resource) {
            value = resource[value];
        }
        value = parseInt(value);

        if (isNaN(value) || value > this.Upper || value < this.Lower) {
            return false;
        }
        return true;
    }

    to_form(resource) {
        return Object.assign(super.to_form(resource),
            {Lower: this.Lower, Upper: this.Upper, Default: this.Default});
    }

    correct(value, resource) {
        value = super.correct(value, resource);
        value = parseInt(value);
        if (isNaN(value)) {
            value = this.Default;
        } else if (value > this.Upper) {
            value = this.Upper;
        } else if (value < this.Lower) {
            value = this.Lower;
        }
        return value;
    }
}


class PositiveInteger extends Integer {
    constructor(name, def=0, desc=null, optional=false) {
        super(name, 0, Infinity, def, desc, optional);
    }
}


class NegativeInteger extends Integer {
    constructor(name, def=0, desc=null, optional=false) {
        super(name, -Infinity, 0, def, desc, optional);
    }
}


class String extends Validator {
    constructor(name, desc, optional) {
        super(name, "string", desc, Boolean(optional));
    }

    check(value, resource) {
        if (typeof value !== "string") {
            return false;
        } else {
            return true;
        }
    }

    correct(value, resource) {
        return "" + super.correct(value, resource);
    }
}


class List extends Validator {
    constructor(name, size, desc=null, optional=false) {
        super(name, "list", desc, optional);
        this.Size = size;
    }

    check(value, resource) {
        if (resource && value in resource) {
            value = resource[value];
        }
        value = eval(value);

        if (typeof value != "object" || Object.keys(value).length != this.Size) {
            return false;
        }
        return true;
    }

    to_form(resource) {
        return Object.assign(super.to_form(resource),
            {Size: this.Size});
    }

    correct(value, resource) {
        value = super.correct(value, resource);
        if (typeof value != "object") {
            return eval(value);
        } else {
            return value;
        }
    }
}


class Options extends Validator {
    constructor(name, options, desc=null, optional=false) {
        super(name, "option", desc, optional);
    }

    check(value, resource) {
        if (resource && value in resource) {
            value = resource[value];
        }
        value = eval(value);

        if (typeof value != "object") {
            return false;
        }
        return true;
    }

    correct(value, resource) {
        value = super.correct(value, resource);
        if (typeof value != "object") {
            value = eval(value);
        } else {
            value = value;
        }
        return Object.assign({}, value);
    }
}


export const vld = {
    NotNull: NotNull,
    Float: Float,
    PositiveFloat: PositiveFloat,
    NegativeFloat: NegativeFloat,
    Prob: Prob,
    Integer: Integer,
    PositiveInteger: PositiveInteger,
    NegativeInteger: NegativeInteger,
    String: String,
    List: List,
    Options: Options
}
