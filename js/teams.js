export async function saveTeamNames(
court,
homeName,
awayName
) {

await update(
    courtRef(court),
    {
        "teams/homeName": homeName,
        "teams/awayName": awayName
    }
);

}