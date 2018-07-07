module.exports =
{
    rollDice: () =>
    {
        var dice = 5;
        var sides = 8;
        var rolls = [];

        for (let i = 0; i < dice; i++)
        {
            rolls.push(Math.ceil(Math.random() * sides));
        }
        console.table(rolls);
        return rolls;
    }
}