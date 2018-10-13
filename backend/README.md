# GamesWithStrangers

## Deployment steps
```
mix edeliver build release production --verbose
mix edeliver deploy release to production --verbose
mix edeliver restart production
```

To verify:
```
mix edeliver version production
```
