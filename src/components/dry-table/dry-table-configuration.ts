interface DryTableConfiguration {
    showRowIndex: boolean;
    paginator: { show: boolean, position: any };
    columns: [{ tag: string, label: string }];
    actions: [{ activator: string, label: string }];
}