interface SetOptions {
    [prop: string]: string;
}

type DeleteOptions = string[];

interface Option {
    selector: string;
    set?: SetOptions;
    delete?: DeleteOptions;
}

type Path = string;

export = async function mkvpropedit(file: Path, options: Option[]) {}
