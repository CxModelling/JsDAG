export class Validator {
    constructor(name, type, desc, optional=false) {
        this.Name = name;
        this.Type = type;
        this.Description = desc;
        this.Optional = optional;
    }

    to_form() {
        return {
            'Name': this.Name,
            'Type': this.Type,
            'Description': this.Description,
            'Optional': this.Optional
        }
    }

    check(value, resource=null) {
        if (value === null) {
            return false;
        } else if (resource && resource.hasOwnProperty(this.Name)) {
            return resource[value];
        } else {
            return value;
        }
    }

    correct(value, resource=null) {
        if (resource && resource.hasOwnProperty(value)) {
            return resource[value];
        } else {
            return value;
        }
    }
}
