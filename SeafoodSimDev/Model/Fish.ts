class Fish {
    private m_age: number;
    private m_maximumAge: number;
    private m_type: number;
    //Types: 0 = cod, 1 = mackerel

    public constructor(p_type: number, p_age?: number) {
        this.m_age = 0;
        this.m_type = p_type;
        if (p_age != undefined) {
            this.m_age = p_age;
        }
    }

    public getType(): number {
        return this.m_type;
    }

    public getAge(): number {
        return this.m_age;
    }

    public age(): void {
        this.m_age++;
    }
    
}