import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export let options = {
    stages: [
        { duration: '10m', target: 20 },
    ],
    thresholds: {
        'http_req_duration': ['p(95)<500'],
    },
};

export default function () {
    //página principal
    let res = http.get('https://petstore.octoperf.com/actions/Catalog.action');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    // Fish
    res = http.get('https://petstore.octoperf.com/actions/Catalog.action?viewCategory=&categoryId=FISH');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    // ProductID: FI-SW-01
    res = http.get('https://petstore.octoperf.com/actions/Catalog.action?viewProduct=&productId=FI-SW-01');
    check(res, {
        'status is 200': (r) => r.status === 200,
    });
    sleep(1);
}

export function handleSummary(data) {
    return {
        './k6/summary_report.json': JSON.stringify(data),
        './k6/summary_report.html': htmlReport(data),
    };
}
