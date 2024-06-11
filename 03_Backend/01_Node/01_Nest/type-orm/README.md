## 240524

#### 1. Nest.js

###### 계층 구조
*  하위 모듈 routing
  > RouterModul.register 을 사용해 명시하기 전에 컨트롤러에서
  ```
  @Controller() << url 공란으로 바꾸기 !!

  ```
  변경해야 적용됨.

```
@Module({
  imports: [
    AdminModule,
    DashboardModule,
    MetricsModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AdminModule,
        children: [
          {
            path: 'dashboard',
            module: DashboardModule,
          },
          {
            path: 'metrics',
            module: MetricsModule,
          },
        ],
      },
    ])
  ],
});
export class AppModule {}
```


######  TypeORM



#### etc

##### 