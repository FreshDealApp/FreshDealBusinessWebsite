import { describe, it, expect, vi } from 'vitest';
import { debounce } from '../utils/debounce.ts';
import { NotificationService } from '../services/notificationService.ts';

describe('debounce utility', () => {
  vi.useFakeTimers();

  it('delays function execution', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 200);
    debounced();
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(200);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('resets timer if called again before wait', () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced();
    vi.advanceTimersByTime(50);
    debounced();
    vi.advanceTimersByTime(50);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("uses latest arguments when executed", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);
    debounced("first");
    debounced("second");
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith("second");
  });

  it("separate instances do not interfere", () => {
    const fn1 = vi.fn();
    const fn2 = vi.fn();
    const d1 = debounce(fn1, 50);
    const d2 = debounce(fn2, 50);
    d1();
    d2();
    vi.advanceTimersByTime(50);
    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
  });
});

describe('NotificationService', () => {
  it('returns the same instance', () => {
    const a = NotificationService.getInstance();
    const b = NotificationService.getInstance();
    expect(a).toBe(b);
  });

  it('converts base64 to Uint8Array', () => {
    const instance: any = NotificationService.getInstance();
    const arr = instance['urlBase64ToUint8Array']('AQID');
    expect(Array.from(arr)).toEqual([1, 2, 3]);
  });

  it('throws when VAPID key not set', async () => {
    const instance: any = NotificationService.getInstance();
    instance.vapidPublicKey = null;
    await expect(instance.subscribeToPushNotifications('t'))
      .rejects.toThrow('VAPID public key not initialized');
  });
});

describe('NotificationService extra', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('converts base64 with padding', () => {
    const instance: any = NotificationService.getInstance();
    const arr = instance['urlBase64ToUint8Array']('AQ');
    expect(Array.from(arr)).toEqual([1]);
  });

  it('subscribes using existing subscription', async () => {
    const instance: any = NotificationService.getInstance();
    instance.vapidPublicKey = 'AAA';
    instance.requestPermission = vi.fn().mockResolvedValue(true);
    const fakeSub = { endpoint: 'x' } as any;
    instance.registerServiceWorker = vi.fn().mockResolvedValue({ pushManager: { getSubscription: vi.fn().mockResolvedValue(fakeSub) } });
    const api = await import('../redux/Api/NotificationApi.ts');
    vi.spyOn(api, 'subscribeWebPushAPI').mockResolvedValue({});
    await instance.subscribeToPushNotifications('t');
    expect(api.subscribeWebPushAPI).toHaveBeenCalledWith(fakeSub, 't');
  });

  it('creates subscription when none exists', async () => {
    const instance: any = NotificationService.getInstance();
    instance.vapidPublicKey = 'AAA';
    instance.requestPermission = vi.fn().mockResolvedValue(true);
    const pushManager = {
      getSubscription: vi.fn().mockResolvedValue(null),
      subscribe: vi.fn().mockResolvedValue({ endpoint: 'new' })
    };
    instance.registerServiceWorker = vi.fn().mockResolvedValue({ pushManager } as any);
    const api = await import('../redux/Api/NotificationApi.ts');
    vi.spyOn(api, 'subscribeWebPushAPI').mockResolvedValue({});
    await instance.subscribeToPushNotifications('t');
    expect(pushManager.subscribe).toHaveBeenCalled();
    expect(api.subscribeWebPushAPI).toHaveBeenCalledWith({ endpoint: 'new' }, 't');
  });

  it('rejects when permission denied', async () => {
    const instance: any = NotificationService.getInstance();
    instance.vapidPublicKey = 'AAA';
    instance.requestPermission = vi.fn().mockResolvedValue(false);
    await expect(instance.subscribeToPushNotifications('t')).rejects.toThrow('Notification permission denied');
  });
});
