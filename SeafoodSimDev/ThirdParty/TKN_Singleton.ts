class TKN_Singleton {
    private static ms_instance: TKN_Singleton;

    constructor() {
        if (TKN_Singleton.ms_instance)
            throw ("Use get Singleton.getInstance");
    }

    static getInstance(): TKN_Singleton {
        if (TKN_Singleton.ms_instance)
            return TKN_Singleton.ms_instance;
        else
            return new TKN_Singleton();
    }
}